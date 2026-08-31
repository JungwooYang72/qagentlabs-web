import { createClient } from "@vercel/kv";
import { NextResponse } from "next/server";

const VALID_PLANS = new Set(["BASIC", "STANDARD", "PRO_PLUS", "PREMIUM", "VIP", "MASTER"]);

// ============================================================
// 전역 자동승인 정책 (2026년 8~9월 무료 베타 / 플레이스토어 비공개 테스트)
// - 미등록 installId도 approved:true + 전역 만료일을 반환 → 참여 링크로 설치한
//   기사 전원이 승인 절차 없이 즉시 사용.
// - 개별 레코드의 만료일은 전역값과 비교해 "더 늦은 쪽"을 사용(floor).
//   저장된 KV 값은 변경하지 않고 조회 시점에만 계산하므로 개별 승인/연장은 보존됨.
// - isBlocked 레코드는 최우선으로 차단 유지(악용자 차단 수단).
// - 10월 원복: DRIVER_HUB_AUTO_APPROVE 를 false 로만 바꾸면 개별 승인 체계로 복귀.
//   (미등록 = 잠금, 개별 결제자 레코드만 통과)
// ============================================================
const DRIVER_HUB_AUTO_APPROVE = true;
// 앱 파싱 형식 yyyy-MM-dd'T'HH:mm:ssXXX (KST).
// ★야간근무 원칙: 대리기사는 야간 근무자이므로 만료를 달력 날짜(자정)로 잡으면
//   8/31 밤 근무 중인 기사가 자정에 앱이 잠겨 그날 영업을 망친다.
//   만료는 반드시 "근무 종료 후 = 다음날 정오" 기준으로 설정한다.
//   → 8~9월 무료 베타는 10/1 12:00(KST)에 만료(9월 연장). 이후 결제자 개별 연장에도 동일 원칙 적용.
const DRIVER_HUB_GLOBAL_EXPIRES_AT = "2026-10-01T12:00:00+09:00";

type DriverPlan = "BASIC" | "STANDARD" | "PRO_PLUS" | "PREMIUM" | "VIP" | "MASTER";

// 8월 무료 베타는 전원 카카오+티맵 모두 사용 → STANDARD(2개 플랫폼) 적용.
// 개별 레코드의 plan(basic 등)도 8월엔 이 값으로 덮는다(전원 카카오+티맵 정책).
// 9월 유료 전환(AUTO_APPROVE=false) 시엔 개별 레코드의 결제 plan으로 복귀.
const DRIVER_HUB_GLOBAL_PLAN: DriverPlan = "STANDARD";

// 두 만료일 문자열 중 더 늦은 값을 원본 형식 그대로 반환. 파싱 불가/빈 값은 과거로 취급.
function laterExpiresAt(a: string, b: string): string {
  const ta = Date.parse(a);
  const tb = Date.parse(b);
  const va = Number.isFinite(ta) ? ta : -Infinity;
  const vb = Number.isFinite(tb) ? tb : -Infinity;
  return va >= vb ? a : b;
}

type EntitlementRecord = {
  installId: string;
  approved: boolean;
  plan: DriverPlan;
  expiresAt: string;
  isBlocked: boolean;
  graceHours: number;
  serverMessage: string;
};

function entitlementKey(installId: string) {
  return `driver-hub:entitlement:${installId}`;
}

function getKvClient() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_READ_ONLY_TOKEN || process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    throw new Error("KV_REST_API_URL and a KV REST API token are required");
  }

  return createClient({ url, token });
}

function defaultEntitlement(installId: string): EntitlementRecord {
  return {
    installId,
    approved: false,
    plan: "BASIC",
    expiresAt: "",
    isBlocked: false,
    graceHours: 0,
    serverMessage: "승인되지 않은 기기 승인 코드입니다.",
  };
}

function normalizeEntitlement(value: unknown, installId: string): EntitlementRecord {
  if (typeof value === "string") {
    try {
      return normalizeEntitlement(JSON.parse(value), installId);
    } catch {
      return defaultEntitlement(installId);
    }
  }

  if (!value || typeof value !== "object") {
    return defaultEntitlement(installId);
  }

  const record = value as Partial<EntitlementRecord>;
  const plan = typeof record.plan === "string" && VALID_PLANS.has(record.plan)
    ? record.plan as DriverPlan
    : "BASIC";

  return {
    installId: typeof record.installId === "string" && record.installId.trim()
      ? record.installId
      : installId,
    approved: record.approved === true,
    plan,
    expiresAt: typeof record.expiresAt === "string" ? record.expiresAt : "",
    isBlocked: record.isBlocked === true,
    graceHours: typeof record.graceHours === "number" && Number.isFinite(record.graceHours)
      ? Math.max(0, Math.floor(record.graceHours))
      : 0,
    serverMessage: typeof record.serverMessage === "string" ? record.serverMessage : "",
  };
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const installId = searchParams.get("installId")?.trim();

  if (!installId) {
    return NextResponse.json(
      { error: "installId is required" },
      { status: 400 }
    );
  }

  try {
    const kv = getKvClient();
    const saved = await kv.get<EntitlementRecord>(entitlementKey(installId));
    const hasRecord = saved !== null && saved !== undefined;
    const record = normalizeEntitlement(saved, installId);

    // 1) 개별 차단(isBlocked)은 자동승인보다 우선 — 저장된 차단 상태를 그대로 반환.
    if (record.isBlocked) {
      return NextResponse.json(record);
    }

    // 2) 전역 자동승인 ON: 미등록/일반 기기 모두 승인 + 전역 만료일(개별값과 floor 비교).
    if (DRIVER_HUB_AUTO_APPROVE) {
      return NextResponse.json({
        installId,
        approved: true,
        // 8월 전원 dual: 개별 레코드 plan도 전역값으로 덮음(정책상 전원 카카오+티맵).
        plan: DRIVER_HUB_GLOBAL_PLAN,
        expiresAt: laterExpiresAt(record.expiresAt, DRIVER_HUB_GLOBAL_EXPIRES_AT),
        isBlocked: false,
        graceHours: record.graceHours,
        // 미등록 기기의 기본 안내문("승인되지 않은...")은 노출하지 않음. 개별 지정값만 유지.
        serverMessage: hasRecord ? record.serverMessage : "",
      });
    }

    // 3) 전역 자동승인 OFF(9월 이후): 개별 승인 체계로 복귀 — 저장된 레코드/기본(잠금) 반환.
    return NextResponse.json(record);
  } catch (error) {
    console.error("[DRIVER_HUB_ENTITLEMENT] GET failed", error);
    return NextResponse.json(
      { error: "entitlement_lookup_failed" },
      { status: 500 }
    );
  }
}

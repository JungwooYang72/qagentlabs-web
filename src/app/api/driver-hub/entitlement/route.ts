import { createClient } from "@vercel/kv";
import { NextResponse } from "next/server";

const VALID_PLANS = new Set(["BASIC", "STANDARD", "PRO_PLUS", "PREMIUM", "VIP", "MASTER"]);

type DriverPlan = "BASIC" | "STANDARD" | "PRO_PLUS" | "PREMIUM" | "VIP" | "MASTER";

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

    return NextResponse.json(normalizeEntitlement(saved, installId));
  } catch (error) {
    console.error("[DRIVER_HUB_ENTITLEMENT] GET failed", error);
    return NextResponse.json(
      { error: "entitlement_lookup_failed" },
      { status: 500 }
    );
  }
}

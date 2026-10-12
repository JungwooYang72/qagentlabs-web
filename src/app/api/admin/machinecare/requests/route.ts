import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { callbackAuthorized, callbackConfigured, callbackConfig, listCallbacks, readCallback, saveCallback, assignCallback, confirmCallbackVerification, validRequestId } from "@/lib/machinecare-callback-store";
export const maxDuration = 60;
const json = (body: object, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
export async function GET(req: Request) {
  if (!callbackAuthorized(req)) return json({ error: "unauthorized" }, 401);
  try {
    const id = new URL(req.url).searchParams.get("id");
    if (id && !validRequestId(id)) return json({ error: "invalid_id" }, 400);
    const c = callbackConfig();
    return json({ items: id ? [await readCallback(id)].filter(Boolean) : await listCallbacks(),
      configured: callbackConfigured(), operators: { hq: c.hqEmail, primary: "주담당(동생)", backup: "보조담당(본부)" } });
  } catch { return json({ error: "접수 조회 연결을 확인해 주세요." }, 503); }
}
export async function POST(req: Request) {
  if (!callbackAuthorized(req)) return json({ error: "unauthorized" }, 401);
  if (!callbackConfigured()) return json({ error: "MachineCare 전용 저장소·본부 알림·발신 설정이 필요합니다." }, 503);
  try {
    const record = await saveCallback(randomUUID(), { name: "MachineCare 저장·조회 검증", phone: "000-0000-0000", region: "시험 데이터", availableTime: "연락 금지 — 실제 고객 아님", summary: "본부 저장·조회 및 알림 수신 확인용 시험 접수. 고객 연락·방문 배정 금지." }, true);
    return json({ success: true, item: await readCallback(record.id) });
  } catch { return json({ error: "시험 접수 저장을 확인하지 못했습니다." }, 502); }
}
export async function PATCH(req: Request) {
  if (!callbackAuthorized(req)) return json({ error: "unauthorized" }, 401);
  try {
    const body = await req.json();
    if (typeof body.id !== "string" || !validRequestId(body.id)) return json({ error: "invalid_id" }, 400);
    if (body.action === "confirm-verification") {
      if (body.confirmedReceiptAndNotification !== true || !await confirmCallbackVerification(body.id)) return json({ error: "실제 조회·알림 수신 확인이 필요합니다." }, 400);
    } else {
      if (!["primary", "backup"].includes(body.role) || !await assignCallback(body.id, body.role)) return json({ error: "배정할 접수와 주담당·보조담당 구분을 확인해 주세요." }, 400);
    }
    return json({ success: true, item: await readCallback(body.id) });
  } catch { return json({ error: "처리를 확인하지 못했습니다. 다시 조회해 주세요." }, 502); }
}

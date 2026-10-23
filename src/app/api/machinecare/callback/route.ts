import { NextResponse } from "next/server";
import { parseMachineCareRequestInput } from "@/lib/machinecare-callback";
import { callbackAvailable, callbackRateAllowed, readCallback, saveCallback, validRequestId } from "@/lib/machinecare-callback-store";
export const maxDuration = 60;
export async function POST(req: Request) {
  const response = (body: object, status: number) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
  try {
    const origin = req.headers.get("origin") ?? "";
    const source = new URL(origin);
    const host = (req.headers.get("host") ?? new URL(req.url).host).toLowerCase();
    if (!["http:", "https:"].includes(source.protocol) || source.host !== host || source.origin !== origin) throw new Error("origin");
  } catch { return response({ error: "요청 경로를 확인해 주세요." }, 403); }
  if (!await callbackAvailable()) return response({ error: "콜백 접수는 준비 중입니다. 이메일 문의를 이용해 주세요." }, 503);
  try {
    const text = await req.text();
    if (text.length > 8000) return response({ error: "문의 내용을 줄여 주세요." }, 413);
    const body = JSON.parse(text);
    const input = parseMachineCareRequestInput(body);
    if (!input || body.consent !== true || typeof body.requestId !== "string" || !validRequestId(body.requestId)) return response({ error: "필수 정보와 개인정보 수집 동의를 확인해 주세요." }, 400);
    const existing = await readCallback(body.requestId);
    if (!existing && !await callbackRateAllowed(req)) return response({ error: "요청이 많습니다. 잠시 후 다시 시도해 주세요." }, 429);
    const stored = await saveCallback(body.requestId, input);
    return response({ success: true, requestId: stored.id }, 200);
  } catch {
    return response({ error: "접수 저장을 확인하지 못했습니다. 같은 요청으로 다시 시도하거나 이메일로 문의해 주세요." }, 502);
  }
}

export async function GET() { return NextResponse.json({ available: await callbackAvailable() }, { headers: { "Cache-Control": "no-store" } }); }

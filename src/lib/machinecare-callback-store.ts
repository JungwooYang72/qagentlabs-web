import { createClient } from "@vercel/kv";
import { createHash, timingSafeEqual } from "node:crypto";
import { Resend } from "resend";
import { CALLBACK_RETENTION_DAYS, type CallbackInput, type CallbackRecord, type CallbackAssignment } from "./machinecare-callback";

const PREFIX = "machinecare:callback:";
const TTL = CALLBACK_RETENTION_DAYS * 86400;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const validRequestId = (value: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
export function callbackConfig() {
  const get = (key: string) => process.env[key]?.trim() ?? "";
  return {
    url: get("MACHINECARE_KV_REST_API_URL"), token: get("MACHINECARE_KV_REST_API_TOKEN"),
    adminToken: get("MACHINECARE_CALLBACK_ADMIN_TOKEN"),
    hqEmail: get("MACHINECARE_CALLBACK_HQ_EMAIL"),
    from: get("MACHINECARE_CALLBACK_FROM_EMAIL"), resendKey: get("MACHINECARE_RESEND_API_KEY") || get("RESEND_API_KEY"),
    enabled: get("MACHINECARE_CALLBACK_ENABLED") === "true",
    verifiedId: get("MACHINECARE_CALLBACK_VERIFIED_REQUEST_ID"),
  };
}
export function callbackConfigured() {
  const c = callbackConfig();
  return Boolean(c.url && c.token && c.adminToken.length >= 32 && c.resendKey &&
    [c.hqEmail, c.from].every(value => emailPattern.test(value)));
}
export function callbackKv() {
  const c = callbackConfig();
  if (!c.url || !c.token) throw new Error("callback_storage_unconfigured");
  return createClient({ url: c.url, token: c.token, retry: { retries: 1 } });
}
export function callbackAuthorized(req: Request) {
  const expected = callbackConfig().adminToken;
  const actual = req.headers.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1] ?? "";
  const expectedBytes = Buffer.from(expected);
  const actualBytes = Buffer.from(actual);
  return expected.length >= 32 && actualBytes.length === expectedBytes.length &&
    timingSafeEqual(expectedBytes, actualBytes);
}
function verificationFingerprint() {
  const c = callbackConfig();
  return createHash("sha256").update(JSON.stringify([c.url, c.token, c.adminToken, c.hqEmail, c.from, c.resendKey])).digest("hex");
}
export async function callbackAvailable() {
  const c = callbackConfig();
  if (!c.enabled || !callbackConfigured() || !validRequestId(c.verifiedId)) return false;
  try {
    const verified = await callbackKv().get<{ fingerprint: string }>(PREFIX + "verification:" + c.verifiedId);
    return verified?.fingerprint === verificationFingerprint();
  } catch { return false; }
}
export async function readCallback(id: string) {
  const kv = callbackKv();
  const record = await kv.get<CallbackRecord>(PREFIX + "record:" + id);
  if (!record) return null;
  const [assignment, notification] = await Promise.all([
    kv.get<CallbackAssignment>(PREFIX + "assignment:" + id),
    kv.get<{ accepted: boolean; hqConfirmedAt?: string }>(PREFIX + "notification:" + id),
  ]);
  return { record, assignment, notification };
}
export async function saveCallback(id: string, input: CallbackInput, verification = false) {
  const kv = callbackKv();
  const record: CallbackRecord = { ...input, id, verification, createdAt: new Date().toISOString(), expiresAt: new Date(Date.now() + TTL * 1000).toISOString() };
  const written = await kv.set(PREFIX + "record:" + id, record, { nx: true, ex: TTL });
  const stored = await kv.get<CallbackRecord>(PREFIX + "record:" + id);
  if (!stored || Object.keys(input).some(key => stored[key as keyof CallbackInput] !== input[key as keyof CallbackInput]) || stored.verification !== verification) {
    throw new Error("callback_write_unconfirmed");
  }
  const previousNotification = await kv.get<{ accepted: boolean }>(PREFIX + "notification:" + id);
  if (written || !previousNotification?.accepted) {
    const c = callbackConfig();
    let accepted = false;
    try {
      const { error, data } = await new Resend(c.resendKey).emails.send({
        from: c.from, to: [c.hqEmail],
        subject: verification ? "[MachineCare 검증] 시험 접수 — 실제 고객 요청 아님" : "[MachineCare] 새 콜백 요청",
        text: "접수번호: " + id + "\n본부 전용 조회: https://www.qagentlabs.com/machinecare/requests\n관리자 인증 후 내용을 확인하고 주담당 또는 보조담당에게 수동 배정해 주세요. 개인정보는 알림 메일에 첨부하지 않습니다.\n" + (verification ? "시험 접수입니다. 고객에게 연락하거나 방문을 배정하지 마세요." : "접수만으로 방문은 확정되지 않았습니다."),
      }, { idempotencyKey: "machinecare-callback-" + id });
      accepted = !error && Boolean(data?.id);
    } catch { /* The saved request remains available to HQ if mail delivery fails. */ }
    await kv.set(PREFIX + "notification:" + id, { accepted }, { ex: TTL });
  }
  return stored;
}
export async function callbackRateAllowed(req: Request) {
  const address = req.headers.get("x-vercel-forwarded-for")?.split(",")[0] ??
    req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  const digest = createHash("sha256").update(callbackConfig().adminToken + address).digest("hex");
  const kv = callbackKv();
  const key = PREFIX + "rate:" + digest;
  const count = await kv.incr(key);
  if (count === 1) await kv.expire(key, 3600);
  return count <= 5;
}
export async function listCallbacks() {
  const kv = callbackKv();
  const records = [];
  // Bound each response; all records remain accessible by receipt ID.
  for await (const key of kv.scanIterator({ match: PREFIX + "record:*", count: 100 })) {
    const record = await kv.get<CallbackRecord>(key);
    if (record) records.push(record);
  }
  records.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return Promise.all(records.slice(0, 100).map(record => readCallback(record.id)));
}
export async function assignCallback(id: string, role: "primary" | "backup") {
  const item = await readCallback(id);
  if (!item || item.record.verification) return false;
  if (!["primary", "backup"].includes(role)) return false;
  const ttl = Math.floor((Date.parse(item.record.expiresAt) - Date.now()) / 1000);
  if (ttl <= 0) return false;
  await callbackKv().set(PREFIX + "assignment:" + id, { role, assignedAt: new Date().toISOString() }, { ex: ttl });
  return true;
}
export async function confirmCallbackVerification(id: string) {
  const item = await readCallback(id);
  if (!item?.record.verification || !item.notification?.accepted) return false;
  const ttl = Math.floor((Date.parse(item.record.expiresAt) - Date.now()) / 1000);
  if (ttl <= 0) return false;
  await callbackKv().set(PREFIX + "notification:" + id, { ...item.notification, hqConfirmedAt: new Date().toISOString() }, { ex: ttl });
  // Non-personal proof survives the 90-day deletion of the synthetic test record.
  await callbackKv().set(PREFIX + "verification:" + id, { fingerprint: verificationFingerprint(), verifiedAt: new Date().toISOString() });
  return true;
}

export type CallbackInput = {
  name: string; phone: string; region: string; availableTime: string; summary: string;
};
export const CALLBACK_RETENTION_DAYS = 90;
export function parseCallbackInput(value: unknown): CallbackInput | null {
  if (!value || typeof value !== "object") return null;
  const body = value as Record<string, unknown>;
  const limits = { name: 80, phone: 24, region: 100, availableTime: 150, summary: 2000 } as const;
  const result = {} as CallbackInput;
  for (const key of Object.keys(limits) as (keyof CallbackInput)[]) {
    if (typeof body[key] !== "string") return null;
    const text = body[key].trim();
    if (!text || text.length > limits[key] || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(text)) return null;
    result[key] = text;
  }
  const digits = result.phone.replace(/\D/g, "");
  return /^[+\d\s()-]+$/.test(result.phone) && digits.length >= 9 && digits.length <= 15 ? result : null;
}
export type CallbackRecord = CallbackInput & {
  id: string; createdAt: string; expiresAt: string; verification: boolean;
};
export type CallbackAssignment = { role: "primary" | "backup"; email: string; assignedAt: string };

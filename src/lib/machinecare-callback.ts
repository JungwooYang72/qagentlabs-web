export type CallbackInput = {
  name: string; phone: string; region: string; availableTime: string; summary: string;
};
export const PARTNER_COOPERATION_FIELDS = {
  parts: "PC·노트북 부품 공급",
  repair: "노트북 전문 수리",
  both: "부품 공급·노트북 전문 수리 모두",
  recovery: "전문 데이터 복구",
} as const;
export type PartnerInput = {
  inquiryType: "partner";
  companyName: string; contactName: string; phone: string; location: string;
  cooperationField: keyof typeof PARTNER_COOPERATION_FIELDS;
  scope: string; logistics: string;
};
export type MachineCareRequestInput = CallbackInput | PartnerInput;
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
export function parsePartnerInput(value: unknown): PartnerInput | null {
  if (!value || typeof value !== "object") return null;
  const body = value as Record<string, unknown>;
  if (body.inquiryType !== "partner" || typeof body.cooperationField !== "string" || !Object.hasOwn(PARTNER_COOPERATION_FIELDS, body.cooperationField)) return null;
  const limits = { companyName: 120, contactName: 80, phone: 24, location: 150, scope: 2000, logistics: 500 } as const;
  const result = {} as PartnerInput;
  for (const key of Object.keys(limits) as (keyof typeof limits)[]) {
    if (typeof body[key] !== "string") return null;
    const text = body[key].trim();
    if (!text || text.length > limits[key] || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(text)) return null;
    result[key] = text;
  }
  const digits = result.phone.replace(/\D/g, "");
  if (!/^[+\d\s()-]+$/.test(result.phone) || digits.length < 9 || digits.length > 15) return null;
  result.inquiryType = "partner";
  result.cooperationField = body.cooperationField as PartnerInput["cooperationField"];
  return result;
}
export function parseMachineCareRequestInput(value: unknown): MachineCareRequestInput | null {
  if (!value || typeof value !== "object") return null;
  const inquiryType = (value as Record<string, unknown>).inquiryType;
  return inquiryType === "partner" ? parsePartnerInput(value) : inquiryType === undefined ? parseCallbackInput(value) : null;
}
export type CallbackRecord = MachineCareRequestInput & {
  id: string; createdAt: string; expiresAt: string; verification: boolean;
};
export type CallbackAssignment = { role: "primary" | "backup"; assignedAt: string };

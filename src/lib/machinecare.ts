export const MACHINECARE_CONTACT = {
  email: "harrison.park@qagentlabs.com",
  person: "상담팀",
} as const;
export const MACHINECARE_INQUIRIES = {
  pc: "PC 점검·수리 상담",
  business: "기업 PC 관리 문의",
  partner: "수리점·기사 도입/제휴 문의",
} as const;
export type MachineCareInquiry = keyof typeof MACHINECARE_INQUIRIES;
export function isMachineCareInquiry(value: unknown): value is MachineCareInquiry {
  return typeof value === "string" && Object.hasOwn(MACHINECARE_INQUIRIES, value);
}
export const MACHINECARE_DRAFT_KEY = "qagent-machinecare-reviewed-draft";


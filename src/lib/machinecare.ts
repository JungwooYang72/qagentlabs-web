export const MACHINECARE_CONTACT = {
  email: "harrison.park@qagentlabs.com",
  person: "상담팀",
} as const;
export const MACHINECARE_INQUIRIES = {
  pc: "PC 점검·수리 상담",
  business: "기업 PC 관리 문의",
  partner: "부품 공급·노트북 전문 수리 협력 문의",
} as const;
export type MachineCareInquiry = keyof typeof MACHINECARE_INQUIRIES;
export function isMachineCareInquiry(value: unknown): value is MachineCareInquiry {
  return typeof value === "string" && Object.hasOwn(MACHINECARE_INQUIRIES, value);
}
export const MACHINECARE_DRAFT_KEY = "qagent-machinecare-reviewed-draft";

export const MACHINECARE_VISIT_AREAS = {
  gyeonggi: ["오산시", "평택시", "수원시", "용인시", "안성시", "화성시", "남양주시", "구리시", "하남시"],
  seoul: ["강동구", "송파구", "광진구", "중랑구"],
} as const;
export const MACHINECARE_BASE_HOURS = "09:00~18:00";


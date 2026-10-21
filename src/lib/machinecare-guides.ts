import data from "@/content/machinecare-guides.json";

export const MACHINECARE_GUIDES = data;
export const MACHINECARE_GUIDE_DATE = "2026-10-22";
export const MACHINECARE_PUBLIC_ORIGIN = "https://www.qagentlabs.com";
export const MACHINECARE_PC_INQUIRY = "/contact?service=machinecare&inquiry=pc";

export function getMachineCareGuide(slug: string) {
  return MACHINECARE_GUIDES.find((guide) => guide.slug === slug);
}

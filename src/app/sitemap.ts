import type { MetadataRoute } from "next";
import { MACHINECARE_GUIDES, MACHINECARE_PUBLIC_ORIGIN } from "@/lib/machinecare-guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/about", "/contact", "/terms", "/privacy", "/refund", "/driver-hub", "/ai-automation", "/products/nx-802ru30", "/machinecare", "/machinecare/guides", "/machinecare/visit"];
  return [
    ...paths.map((path) => ({ url: `${MACHINECARE_PUBLIC_ORIGIN}${path}`, ...(["", "/machinecare", "/machinecare/visit", "/machinecare/guides"].includes(path) ? { lastModified: "2026-10-28" } : {}) })),
    ...MACHINECARE_GUIDES.map((guide) => ({ url: `${MACHINECARE_PUBLIC_ORIGIN}/machinecare/guides/${guide.slug}`, lastModified: guide.updatedAt })),
  ];
}

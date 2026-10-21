import type { MetadataRoute } from "next";
import { MACHINECARE_GUIDES, MACHINECARE_PUBLIC_ORIGIN } from "@/lib/machinecare-guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/about", "/contact", "/privacy", "/driver-hub", "/ai-automation", "/products/nx-802ru30", "/machinecare", "/machinecare/guides", "/machinecare/visit"];
  return [
    ...paths.map((path) => ({ url: `${MACHINECARE_PUBLIC_ORIGIN}${path}` })),
    ...MACHINECARE_GUIDES.map((guide) => ({ url: `${MACHINECARE_PUBLIC_ORIGIN}/machinecare/guides/${guide.slug}`, lastModified: guide.updatedAt })),
  ];
}

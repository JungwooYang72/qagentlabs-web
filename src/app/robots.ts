import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/machinecare/requests"] },
    sitemap: "https://www.qagentlabs.com/sitemap.xml",
  };
}

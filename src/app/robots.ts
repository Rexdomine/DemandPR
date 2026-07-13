import type { MetadataRoute } from "next";

import { getSiteUrl, isIndexingEnabled } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  if (!isIndexingEnabled()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  const siteUrl = getSiteUrl();
  if (!siteUrl) throw new Error("Indexable site URL validation failed.");
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
  };
}

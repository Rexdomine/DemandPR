import type { MetadataRoute } from "next";

import { getSiteUrl, isIndexingEnabled } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isIndexingEnabled()) return [];

  const siteUrl = getSiteUrl();
  return siteUrl
    ? [
        { url: siteUrl.toString(), changeFrequency: "monthly", priority: 1 },
        {
          url: new URL("/africa-market-entry-programme", siteUrl).toString(),
          changeFrequency: "monthly",
          priority: 0.9,
        },
        {
          url: new URL("/services", siteUrl).toString(),
          changeFrequency: "monthly",
          priority: 0.8,
        },
        {
          url: new URL("/contact", siteUrl).toString(),
          changeFrequency: "monthly",
          priority: 0.8,
        },
      ]
    : [];
}

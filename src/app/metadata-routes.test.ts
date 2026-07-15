import { afterEach, describe, expect, it, vi } from "vitest";

import robots from "./robots";
import sitemap from "./sitemap";

afterEach(() => vi.unstubAllEnvs());

describe("metadata routes", () => {
  it("blocks indexing by default", () => {
    vi.stubEnv("SITE_INDEXABLE", "false");
    vi.stubEnv("VERCEL_ENV", "preview");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");

    expect(robots()).toEqual({ rules: { userAgent: "*", disallow: "/" } });
    expect(sitemap()).toEqual([]);
  });

  it("keeps preview deployments out of the sitemap even when an origin is configured", () => {
    vi.stubEnv("SITE_INDEXABLE", "false");
    vi.stubEnv("VERCEL_ENV", "preview");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://preview.example");

    expect(sitemap()).toEqual([]);
  });

  it("emits an absolute sitemap only for a valid indexable production origin", () => {
    vi.stubEnv("SITE_INDEXABLE", "true");
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://demand.example");

    expect(robots()).toEqual({
      rules: { userAgent: "*", allow: "/" },
      sitemap: "https://demand.example/sitemap.xml",
    });
    expect(sitemap()).toEqual([
      {
        url: "https://demand.example/",
        changeFrequency: "monthly",
        priority: 1,
      },
      {
        url: "https://demand.example/africa-market-entry-programme",
        changeFrequency: "monthly",
        priority: 0.9,
      },
      {
        url: "https://demand.example/services",
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        url: "https://demand.example/about",
        changeFrequency: "monthly",
        priority: 0.8,
      },
    ]);
  });

  it("fails closed when indexing is enabled without an approved origin", () => {
    vi.stubEnv("SITE_INDEXABLE", "true");
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");

    expect(() => robots()).toThrow(/NEXT_PUBLIC_SITE_URL is required/);
    expect(() => sitemap()).toThrow(/NEXT_PUBLIC_SITE_URL is required/);
  });
});

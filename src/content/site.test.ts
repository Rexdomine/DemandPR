import { describe, expect, it } from "vitest";

import {
  clientReasons,
  commercialOutcomes,
  featuredServices,
  navigation,
  retainerServices,
  site,
  successStories,
  whyDemandPr,
} from "./site";

describe("approved site content", () => {
  it("preserves the approved identity and homepage hero", () => {
    expect(site.name).toBe("Demand PR Ltd");
    expect(site.hero.heading).toBe("Expand into Africa with Confidence");
    expect(site.hero.primaryCta.label).toBe("Book a Strategy Consultation");
  });

  it("provides unique, internal navigation targets", () => {
    const hrefs = navigation.map(({ href }) => href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
    expect(hrefs.every((href) => href.startsWith("/"))).toBe(true);
  });

  it("preserves the complete approved homepage content model", () => {
    expect(whyDemandPr).toHaveLength(6);
    expect(featuredServices).toHaveLength(7);
    expect(clientReasons).toHaveLength(6);
    expect(commercialOutcomes).toHaveLength(8);
    expect(successStories).toHaveLength(4);
    expect(retainerServices).toHaveLength(7);
    expect(featuredServices[0]?.title).toBe("Africa Market Entry Programme");
    expect(whyDemandPr.at(-1)).toMatch(/long-term strategic partner/i);
  });

  it("does not fabricate metrics or named success-story clients", () => {
    expect(JSON.stringify(featuredServices)).not.toMatch(
      /\d+%|clients served|years of/i,
    );
    expect(
      successStories.every(({ text }) => text.startsWith("For client review:")),
    ).toBe(true);
  });
});

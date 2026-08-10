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
    expect(site.hero.primaryCta.label).toBe("Strategy Consultation Details");
  });

  it("provides unique, internal navigation targets", () => {
    const hrefs = navigation.map(({ href }) => href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
    expect(hrefs.every((href) => href.startsWith("/"))).toBe(true);
    expect(navigation).toContainEqual({
      label: "Market Entry Programme",
      href: "/africa-market-entry-programme",
    });
    expect(navigation).toContainEqual({ label: "Services", href: "/services" });
    expect(site.hero.secondaryCta).toEqual({
      label: "Explore Our Services",
      href: "/services",
    });
    expect(site.hero.primaryCta.href).toBe("/contact");
    expect(navigation).toContainEqual({ label: "Contact", href: "/contact" });
    expect(featuredServices[0]?.href).toBe("/africa-market-entry-programme");
    expect(
      featuredServices.slice(1).every(({ href }) => href === "/contact"),
    ).toBe(true);
  });

  it("preserves the complete approved homepage content model", () => {
    expect(whyDemandPr).toHaveLength(6);
    expect(featuredServices).toHaveLength(7);
    expect(clientReasons).toHaveLength(6);
    expect(commercialOutcomes).toHaveLength(8);
    expect(successStories).toHaveLength(12);
    expect(retainerServices).toHaveLength(7);
    expect(featuredServices[0]?.title).toBe("Africa Market Entry Programme");
    expect(whyDemandPr.at(-1)).toMatch(/long-term strategic partner/i);
  });

  it("publishes only the client-supplied recent projects without fabricated metrics", () => {
    const content = JSON.stringify({
      clientReasons,
      commercialOutcomes,
      featuredServices,
      successStories,
      whyDemandPr,
    });
    expect(content).not.toMatch(
      /\d+%|clients served|years of|15\+|Est\. 2014|accredited advisors|12 hubs|24 nations|For client review|Series B|proprietary data|premier|unrivalled|world's last frontier/i,
    );
    expect(successStories.map(({ title }) => title)).toEqual([
      "GESA Summit",
      "World Travel Market (WTM) London",
      "UK–Nigeria Trade Summits",
      "British–Nigerian Law Forum",
      "Air Peace Trade Expo",
      "African Tourism Board (ATB)",
      "World Petroleum Congress",
      "Royal Norfolk Agricultural Show",
      "US–Africa Trade Congress",
      "Farnborough International Airshow",
      "InfoSecurity Europe",
      "UK Cyber Week",
    ]);
    expect(successStories.every(({ text }) => text.length > 60)).toBe(true);
  });
});

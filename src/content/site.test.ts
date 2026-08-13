import { describe, expect, it } from "vitest";

import {
  clientReasons,
  commercialOutcomes,
  featuredServices,
  navigation,
  retainerServices,
  site,
  successStories,
  supportedIndustryDescriptions,
  whyDemandPr,
} from "./site";

describe("approved site content", () => {
  it("preserves the approved identity and homepage hero", () => {
    expect(site.name).toBe("Demand PR Ltd");
    expect(site.headerCta).toEqual({
      label: "Book a Consultation",
      href: "/contact",
    });
    expect(site.hero.heading).toBe(
      "We Help Organisations Enter, Grow and Succeed in Africa",
    );
    expect(site.hero.subheading).toBe(
      "We connect international organisations doing business in Africa with the market, the people and opportunities they need to thrive across Africa.",
    );
    expect(site.hero.primaryCta).toEqual({
      label: "Explore Our Services",
      href: "/services",
    });
    expect(site.hero.secondaryCta).toEqual({
      label: "Book a Consultation",
      href: "/contact",
    });
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
    expect(site.hero.primaryCta).toEqual({
      label: "Explore Our Services",
      href: "/services",
    });
    expect(site.hero.secondaryCta.href).toBe("/contact");
    expect(navigation).toContainEqual({ label: "Contact", href: "/contact" });
    expect(
      featuredServices.every(({ href }) => href.startsWith("/services#")),
    ).toBe(true);
  });

  it("preserves the complete approved homepage content model", () => {
    expect(whyDemandPr).toHaveLength(6);
    expect(featuredServices).toHaveLength(6);
    expect(clientReasons).toHaveLength(6);
    expect(supportedIndustryDescriptions).toEqual({
      "International Businesses":
        "Market entry support, local introductions, business development, stakeholder engagement and on-the-ground market access.",
      "Investors & Private Equity":
        "Identifying opportunities, facilitating introductions, conducting local engagement and supporting investment activities on the ground.",
      "NGOs & Development Partners":
        "Partner identification, stakeholder engagement, local coordination, programme support and access to relevant communities and institutions.",
      "Tourism Boards & Destinations":
        "Destination promotion, trade outreach, stakeholder introductions, tourism partnerships and connecting destinations with international markets.",
      "Chambers & Trade Associations":
        "Business matchmaking, trade delegations, member engagement, stakeholder introductions and practical support for market expansion.",
      "Universities & Institutions":
        "Partnership development, delegation support and stakeholder engagement, connecting institutions with relevant organisations for bespoke training. We source and coordinate high-quality business management and leadership trainers and manage the training requirements from start to finish.",
      "Event Organisers":
        "Delegate recruitment, speaker and VIP coordination, invitations and outreach, event promotion, stakeholder and sponsorship engagement, registration support, logistics and on-the-ground event management.",
    });
    expect(commercialOutcomes).toHaveLength(8);
    expect(successStories).toHaveLength(12);
    expect(retainerServices).toHaveLength(7);
    expect(featuredServices).toEqual([
      {
        title: "PR & Strategic Communications",
        description:
          "Building powerful brands and managing reputations that drive impact.",
        href: "/services#pr-strategic-communications",
      },
      {
        title: "Events & Conference Management",
        description:
          "Delivering high-impact events, summits and executive gatherings.",
        href: "/services#events-conference-management",
      },
      {
        title: "Trade Delegations & Market Entry",
        description:
          "Leading trade missions and facilitating market entry across Africa.",
        href: "/services#trade-delegations-market-entry",
      },
      {
        title: "Leadership & Parliamentary Training",
        description:
          "Executive training programmes for leaders and institutions.",
        href: "/services#leadership-parliamentary-training",
      },
      {
        title: "Investor Hub",
        description:
          "Connecting investors with opportunities, partners and key stakeholders.",
        href: "/services#investor-hub",
      },
      {
        title: "Business Concierge",
        description:
          "Bespoke support services for executives, investors and delegations.",
        href: "/services#business-concierge",
      },
    ]);
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

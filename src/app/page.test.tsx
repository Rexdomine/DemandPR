import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { render, screen, within } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import Home from "./page";

function webpContract(buffer: Buffer) {
  expect(buffer.subarray(0, 4).toString("ascii")).toBe("RIFF");
  expect(buffer.subarray(8, 12).toString("ascii")).toBe("WEBP");

  const chunks: string[] = [];
  let offset = 12;

  while (offset + 8 <= buffer.length) {
    const type = buffer.subarray(offset, offset + 4).toString("ascii");
    const length = buffer.readUInt32LE(offset + 4);
    chunks.push(type);

    if (type === "VP8 ") {
      const payload = offset + 8;
      expect(buffer.subarray(payload + 3, payload + 6).toString("hex")).toBe(
        "9d012a",
      );
      return {
        chunks,
        width: buffer.readUInt16LE(payload + 6) & 0x3fff,
        height: buffer.readUInt16LE(payload + 8) & 0x3fff,
      };
    }

    offset += 8 + length + (length % 2);
  }

  throw new Error("WebP VP8 dimensions could not be read");
}

describe("homepage", () => {
  it("uses a clear landmark and heading structure", () => {
    render(<Home />);
    expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", {
        name: "We Help Organisations Enter, Grow and Succeed in Africa",
      }),
    ).toBeVisible();
    for (const name of [
      "Our Core Services",
      "Industries We Support",
      "Why Demand PR",
      "Featured Solutions",
      "Recent Projects",
      "Our Partners",
      "Ready to Expand into Africa?",
    ]) {
      expect(screen.getByRole("heading", { level: 2, name })).toBeVisible();
    }
    const sectionHeadings = Array.from(
      document.querySelectorAll("main > section h2"),
    ).map((heading) => heading.textContent);
    expect(sectionHeadings).toEqual([
      "Our Core Services",
      "Industries We Support",
      "Why Demand PR",
      "Featured Solutions",
      "Recent Projects",
      "Our Partners",
      "Ready to Expand into Africa?",
    ]);
    expect(document.querySelectorAll("main > section")).toHaveLength(8);
  });

  it("places the two approved partner marks after Recent Projects and before consultation", () => {
    render(<Home />);

    const partnersHeading = screen.getByRole("heading", {
      level: 2,
      name: "Our Partners",
    });
    const partnersSection = partnersHeading.closest("section");
    const sectionIds = Array.from(
      document.querySelectorAll("main > section"),
      (section) => section.id,
    );

    expect(sectionIds.indexOf("partners")).toBe(
      sectionIds.indexOf("recent-projects") + 1,
    );
    expect(sectionIds.indexOf("consultation")).toBe(
      sectionIds.indexOf("partners") + 1,
    );
    expect(
      within(partnersSection!).getByRole("img", { name: "CareMate" }),
    ).toHaveAttribute("src", expect.stringContaining("caremate-partner.svg"));
    expect(
      within(partnersSection!).getByRole("img", {
        name: "Wendoo School Breakfast Empowerment Initiative",
      }),
    ).toHaveAttribute("src", expect.stringContaining("wendoo-partner.svg"));
    expect(partnersSection?.querySelectorAll(".partner-card")).toHaveLength(2);
  });

  it("bundles the exact two client-supplied transparent SVG logo files", () => {
    const approvedAssets = [
      {
        path: "public/images/partners/caremate-partner.svg",
        bytes: 212_227,
        sha256:
          "e3d50b8641f126bbfe688709ff6382a123f95218572c13e601caf4640281ef83",
      },
      {
        path: "public/images/partners/wendoo-partner.svg",
        bytes: 26_156,
        sha256:
          "eca75d5f544dca68ba75f26bf6d18ecca0b910ba95a71db51cd351035ec4e38b",
      },
    ];

    for (const asset of approvedAssets) {
      const image = readFileSync(join(process.cwd(), asset.path));
      expect(image.byteLength).toBe(asset.bytes);
      expect(createHash("sha256").update(image).digest("hex")).toBe(
        asset.sha256,
      );
    }
  });

  it("keeps the approved partner marks intentionally compact", () => {
    const css = readFileSync(
      join(process.cwd(), "src/app/globals.css"),
      "utf8",
    );

    expect(css).toContain("max-width: 46rem;");
    expect(css).toContain("min-height: 9rem;");
    expect(css).toContain("max-width: 13.5rem;");
    expect(css).toContain("max-width: 11.75rem;");
    expect(css).toContain("max-width: 11.5rem;");
    expect(css).toContain("max-width: 10.5rem;");
    expect(css).not.toContain("max-width: 21rem;");
    expect(css).not.toContain("max-width: 19rem;");
  });

  it("uses a balanced desktop service grid and one semantic premium icon language", () => {
    const { container } = render(<Home />);
    const serviceSection = screen
      .getByRole("heading", { name: "Our Core Services" })
      .closest("section");
    const industrySection = screen
      .getByRole("heading", { name: "Industries We Support" })
      .closest("section");

    expect(serviceSection).toHaveAttribute("data-layout", "three-by-two");
    expect(
      Array.from(
        serviceSection!.querySelectorAll("[data-premium-icon]"),
        (icon) => icon.getAttribute("data-premium-icon"),
      ),
    ).toEqual([
      "communications",
      "events",
      "market-entry",
      "leadership-training",
      "investor-hub",
      "concierge",
    ]);
    expect(
      Array.from(
        industrySection!.querySelectorAll("[data-premium-icon]"),
        (icon) => icon.getAttribute("data-premium-icon"),
      ),
    ).toEqual([
      "international-business",
      "private-equity",
      "development-partners",
      "tourism",
      "trade-associations",
      "universities",
      "event-organisers",
    ]);
    expect(container.querySelectorAll("svg[data-premium-icon]")).toHaveLength(
      13,
    );
  });

  it("makes Why Demand PR the heading and Competitive Advantage the overline", () => {
    render(<Home />);
    const heading = screen.getByRole("heading", {
      level: 2,
      name: "Why Demand PR",
    });
    const section = heading.closest("section");

    expect(section).toHaveAttribute("id", "why-demand-pr");
    expect(section?.querySelector(".eyebrow")).toHaveTextContent(
      "Competitive Advantage",
    );
  });

  it("uses local Stitch imagery with useful alternative text", () => {
    const { container } = render(<Home />);
    const images = Array.from(container.querySelectorAll("img"));

    expect(images).toHaveLength(6);
    expect(
      images.every((image) => image.getAttribute("src")?.startsWith("/")),
    ).toBe(true);
    expect(images.every((image) => Boolean(image.getAttribute("alt")))).toBe(
      true,
    );
    expect(
      screen
        .getByAltText(
          "Senior African market adviser in a burgundy suit leading a private executive consultation",
        )
        .getAttribute("src"),
    ).toContain("demand-pr-owner-strategic-counsel.webp");
    const sources = images.map((image) => image.getAttribute("src") ?? "");
    for (const filename of [
      "trade-delegation-access.webp",
      "investment-forum-orchestration.webp",
      "sector-entry-field-advisory.webp",
    ]) {
      expect(sources.some((source) => source.includes(filename))).toBe(true);
    }
  });

  it("bundles a retina-ready premium-quality owner-likeness hero derivative", () => {
    const image = readFileSync(
      join(
        process.cwd(),
        "public/images/home/demand-pr-owner-strategic-counsel.webp",
      ),
    );
    const pageSource = readFileSync(
      join(process.cwd(), "src/app/page.tsx"),
      "utf8",
    );

    expect(webpContract(image)).toEqual({
      chunks: ["VP8 "],
      width: 3840,
      height: 1974,
    });
    expect(image.byteLength).toBeGreaterThan(200_000);
    expect(image.byteLength).toBeLessThan(400_000);
    expect(createHash("sha256").update(image).digest("hex")).toBe(
      "0d345c71e0cb617cf972aa40c03c3b70fc96b92d176db7910d9e2af1d4112d22",
    );
    expect(pageSource).toContain("unoptimized");
    expect(pageSource).not.toContain("quality={95}");
  });

  it("does not publish unsupported claims or review placeholders", () => {
    const { container } = render(<Home />);
    expect(container.textContent).not.toMatch(
      /15\+|Est\. 2014|accredited advis(?:e|o)rs|12 (?:key )?(?:regional )?hubs|24 (?:African )?nations|elite network access|For client review|launch configuration/i,
    );
    expect(container.textContent).not.toMatch(/illustrative capability/i);
  });

  it("uses approved existing sectors and client-supplied recent projects", () => {
    render(<Home />);
    const industrySection = screen
      .getByRole("heading", { name: "Industries We Support" })
      .closest("section");

    for (const sector of [
      "International Businesses",
      "Investors & Private Equity",
      "NGOs & Development Partners",
      "Tourism Boards & Destinations",
      "Chambers & Trade Associations",
      "Universities & Institutions",
      "Event Organisers",
    ]) {
      expect(
        within(industrySection!).getByRole("heading", { name: sector }),
      ).toBeVisible();
    }

    for (const description of [
      "Market entry, local introductions and on-the-ground business development and stakeholder support.",
      "Opportunity identification, local introductions and practical support for investment activity.",
      "Partner identification, community and institutional access, local coordination and programme support.",
      "Destination promotion, trade outreach and tourism partnerships connecting destinations with international markets.",
      "Business matchmaking, trade delegations and member and stakeholder engagement supporting market expansion.",
      "Partnerships, delegations and bespoke training delivered through expert trainer sourcing and end-to-end coordination.",
      "Delegate recruitment, speaker and VIP coordination, promotion, sponsorship, registration, logistics and on-the-ground delivery.",
    ]) {
      expect(within(industrySection!).getByText(description)).toBeVisible();
    }

    expect(
      within(industrySection!).queryByText(
        "Strategic market, stakeholder and partnership support.",
      ),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { level: 3, name: "Government Agencies" }),
    ).not.toBeInTheDocument();

    for (const project of [
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
    ]) {
      expect(
        screen.getByRole("heading", { level: 3, name: project }),
      ).toBeVisible();
    }

    expect(
      screen.getAllByText("International delegation leadership"),
    ).toHaveLength(7);
  });

  it("publishes the approved hero and core-services copy with direct service links", () => {
    render(<Home />);

    expect(
      screen.getByText(
        "We connect international organisations doing business in Africa with the market, the people and opportunities they need to thrive across Africa.",
      ),
    ).toBeVisible();
    expect(
      screen.getByText(
        /international business growth and market-entry specialist/i,
      ),
    ).toBeVisible();
    expect(screen.getByText(/business visa support/i)).toBeVisible();

    const expectedLinks = [
      "pr-strategic-communications",
      "events-conference-management",
      "trade-delegations-market-entry",
      "leadership-parliamentary-training",
      "investor-hub",
      "business-concierge",
    ];
    const servicesSection = screen
      .getByRole("heading", { name: "Our Core Services" })
      .closest("section");
    within(servicesSection!)
      .getAllByRole("link", { name: /Learn more/i })
      .forEach((link, index) =>
        expect(link).toHaveAttribute(
          "href",
          `/services#${expectedLinks[index]}`,
        ),
      );
  });

  it("preserves the consultation bridge with a real contact destination", () => {
    const { container } = render(<Home />);
    expect(container.querySelector("#consultation")).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "Strategy Consultation Details" }),
    ).not.toHaveLength(0);
    screen
      .getAllByRole("link", { name: "Strategy Consultation Details" })
      .forEach((link) => expect(link).toHaveAttribute("href", "/contact"));
  });

  it("has no detectable automated accessibility violations", async () => {
    const { container } = render(<Home />);
    const results = await axe(container);
    expect(results.violations).toEqual([]);
  });
});

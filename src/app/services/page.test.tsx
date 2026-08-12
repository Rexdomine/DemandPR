import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { render, screen, within } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import ServicesPage, { metadata } from "./page";

const sectionHeadings = [
  "One strategic partner. Six connected service areas.",
  "Our Six Core Service Areas",
  "The Methodology",
  "The Power of Retained Advisory",
  "Our Sector Expertise",
  "Ready to Navigate the African Opportunity?",
] as const;

const serviceNames = [
  "PR & Strategic Communications",
  "Events & Conference Management",
  "Trade Delegations & Market Entry",
  "Leadership & Parliamentary Training",
  "Investor Hub",
  "Business Concierge",
] as const;

const prohibitedClaims =
  /Aerra|15\+|regional (?:hub|office)s?|offices?|Nairobi|Lagos|Johannesburg|London|proprietary network|exclusive (?:or off-market )?deal flow|off-market|guaranteed|proven|profitable|accredit(?:ed|ation)|award(?:ed|s)|legal advice|legal presence|crisis management|strategy@|\+\d[\d\s()-]{7,}|WhatsApp|testimonial|credentials package/i;

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

describe("Services page", () => {
  it("renders exactly six ordered sections, one H1 and a named main landmark", () => {
    const { container } = render(<ServicesPage />);
    const main = screen.getByRole("main");
    const sections = Array.from(
      container.querySelectorAll<HTMLElement>("main > section"),
    );

    expect(main).toHaveAttribute("id", "main-content");
    expect(main).toHaveClass("services-page");
    expect(sections).toHaveLength(6);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      sections.map((section) =>
        within(section as HTMLElement).getByRole("heading", {
          name: sectionHeadings[sections.indexOf(section)],
        }),
      ),
    ).toHaveLength(6);
  });

  it("presents the six client-approved image-led core services", () => {
    render(<ServicesPage />);
    const pillars = screen
      .getByRole("heading", { name: "Our Six Core Service Areas" })
      .closest("section");
    expect(pillars).not.toBeNull();
    expect(pillars).toHaveAttribute("id", "service-pillars");

    serviceNames.forEach((name) =>
      expect(within(pillars!).getByRole("heading", { name })).toBeVisible(),
    );
    expect(within(pillars!).getAllByRole("article")).toHaveLength(6);
    expect(pillars!.querySelectorAll("img")).toHaveLength(6);
    expect(pillars!.querySelectorAll("[data-premium-icon]")).toHaveLength(0);
  });

  it("uses only approved local media with meaningful alternative text", () => {
    const { container } = render(<ServicesPage />);
    const images = Array.from(container.querySelectorAll("img"));
    const sources = decodeURIComponent(
      images.map((image) => image.getAttribute("src")).join(" "),
    );

    expect(images).toHaveLength(8);
    expect(sources).toContain("/images/services/strategy-in-motion.webp");
    expect(sources).toContain(
      "/images/services/retained-advisory-partnership.webp",
    );
    for (const source of [
      "/images/home/investment-forum-orchestration.webp",
      "/images/home/trade-delegation-access.webp",
      "/images/about/context-made-practical.webp",
      "/images/market-entry/market-entry-partnership-in-practice.webp",
      "/images/services/business-concierge-executive-arrival.webp",
    ]) {
      expect(sources).toContain(source);
    }
    expect(
      screen.getByAltText(
        "International business traveller carrying travel documents beside a private aircraft",
      ),
    ).toBeVisible();
    expect(sources).not.toMatch(
      /african-city-twilight|strategic-adviser|01-full|02-full|googleusercontent|https?:|data:/i,
    );
    expect(images.every((image) => Boolean(image.getAttribute("alt")))).toBe(
      true,
    );
  });

  it("uses the client-approved Services hero headline and supporting copy", () => {
    render(<ServicesPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "One strategic partner. Six connected service areas.",
      }),
    ).toBeVisible();
    expect(
      screen.getByText(
        "Demand PR combines PR, events, market access, leadership, investment and executive business support to help organisations build visibility, enter markets, connect with decision-makers and turn opportunities into action.",
      ),
    ).toBeVisible();
  });

  it("publishes the client PDF descriptions, practical bullets and service anchors", () => {
    const { container } = render(<ServicesPage />);

    for (const id of [
      "pr-strategic-communications",
      "events-conference-management",
      "trade-delegations-market-entry",
      "leadership-parliamentary-training",
      "investor-hub",
      "business-concierge",
    ]) {
      expect(container.querySelector(`#${id}`)).toBeInTheDocument();
    }
    for (const item of [
      "PR strategy and communications planning",
      "Stakeholder and media engagement",
      "Arrange B2B meetings and introductions",
      "Media and interview preparation",
      "Coordinate site visits and investment missions",
      "Secure business visas and provide travel support",
      "Airport arrival and departure protocols",
    ]) {
      expect(screen.getByText(item)).toBeVisible();
    }
  });

  it("bundles the exact optimized Services media without metadata chunks", () => {
    const assets = [
      {
        file: "strategy-in-motion.webp",
        dimensions: { width: 1672, height: 941 },
        hash: "e2dfaca5869b061bdb7318f8636284c6f6005579056c80bbb417d4408f0ae616",
      },
      {
        file: "retained-advisory-partnership.webp",
        dimensions: { width: 1254, height: 1254 },
        hash: "a7007723c971ebd2b7b5b4ba6cca3db27c7db7801bf8b52cb02fed9d8e845c2e",
      },
      {
        file: "business-concierge-executive-arrival.webp",
        dimensions: { width: 1254, height: 1254 },
        hash: "093b7be428ac481f7508f5082d8e235ffc10fe35a6424893d6dcadcc8e28e1c8",
      },
    ] as const;

    for (const asset of assets) {
      const image = readFileSync(
        join(process.cwd(), "public/images/services", asset.file),
      );

      expect(webpContract(image)).toEqual({
        chunks: ["VP8 "],
        ...asset.dimensions,
      });
      expect(createHash("sha256").update(image).digest("hex")).toBe(asset.hash);
      expect(image.byteLength).toBeLessThan(100_000);
    }
  });

  it("uses the required safe CTA destinations and no placeholder or fabricated links", () => {
    const { container } = render(<ServicesPage />);
    const hero = screen.getByRole("heading", { level: 1 }).closest("section");
    const finalCta = screen
      .getByRole("heading", {
        name: "Ready to Navigate the African Opportunity?",
      })
      .closest("section");

    expect(
      within(hero!).getByRole("link", { name: "Explore Our Services" }),
    ).toHaveAttribute("href", "/services");
    expect(
      within(hero!).queryByRole("link", {
        name: "Strategy Consultation Details",
      }),
    ).toBeNull();
    expect(
      within(finalCta!).getByRole("link", {
        name: "Strategy Consultation Details",
      }),
    ).toHaveAttribute("href", "/contact");
    expect(
      screen.getByRole("link", { name: "Explore Core Services" }),
    ).toHaveAttribute("href", "/services#service-pillars");
    expect(
      screen.getByRole("link", { name: "Explore the Market Entry Programme" }),
    ).toHaveAttribute("href", "/africa-market-entry-programme");
    expect(container.querySelector('a[href=""], a[href="#"]')).toBeNull();
    for (const link of screen.getAllByRole("link")) {
      expect(link.getAttribute("href")).toMatch(/^\/(?:[^#]|#.+)/);
    }
  });

  it("keeps sector labels non-interactive and public copy within approved boundaries", () => {
    const { container } = render(<ServicesPage />);
    const sectorSection = screen
      .getByRole("heading", { name: "Our Sector Expertise" })
      .closest("section");
    expect(sectorSection).toHaveAttribute("id", "sector-expertise");
    expect(container.textContent).not.toMatch(prohibitedClaims);
    [
      "International Businesses",
      "Investors & Private Equity",
      "NGOs & Development Partners",
      "Tourism Boards & Destinations",
      "Chambers & Trade Associations",
      "Universities & Institutions",
      "Event Organisers",
    ].forEach((sector) =>
      expect(within(sectorSection!).getByText(sector)).toBeVisible(),
    );
    expect(
      within(sectorSection!).queryByText("Government Agencies"),
    ).toBeNull();
    expect(within(sectorSection!).queryAllByRole("link")).toHaveLength(0);
  });

  it("publishes page metadata and canonical route", () => {
    expect(metadata.title).toBe("Services");
    expect(metadata.description).toMatch(/strategic|advisory/i);
    expect(metadata.alternates).toEqual({ canonical: "/services" });
  });

  it("has no detectable automated accessibility violations", async () => {
    const { container } = render(<ServicesPage />);
    expect((await axe(container)).violations).toEqual([]);
  });
});

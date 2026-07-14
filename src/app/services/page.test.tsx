import { render, screen, within } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import ServicesPage, { metadata } from "./page";

const sectionHeadings = [
  "Strategic Support for Market Entry, Investment and Growth Across Africa",
  "Service Pillars",
  "The Methodology",
  "The Power of Retained Advisory",
  "Our Sector Expertise",
  "Ready to Navigate the African Opportunity?",
] as const;

const pillarGroups = [
  "Market Entry & Intelligence",
  "Representation & Relationships",
  "Missions, Forums & Events",
  "Executive & Corporate Support",
] as const;

const serviceNames = [
  "Africa Market Entry",
  "Market Intelligence",
  "Investor Representation",
  "Government Relations",
  "PR & Stakeholder Engagement",
  "Trade Missions",
  "Investment Forums",
  "Executive Events",
  "Corporate Concierge",
  "Strategic Introductions",
  "Visa & Immigration",
] as const;

const prohibitedClaims =
  /Aerra|15\+|(?:regional )?(?:hub|office)s?|Nairobi|Lagos|Johannesburg|London|proprietary network|exclusive (?:or off-market )?deal flow|off-market|guaranteed|proven|profitable|accredit(?:ed|ation)|award(?:ed|s)|legal advice|legal presence|crisis management|strategy@|\+\d[\d\s()-]{7,}|WhatsApp|testimonial|credentials package/i;

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

  it("presents all four pillar groups and all eleven approved service topics", () => {
    render(<ServicesPage />);
    const pillars = screen
      .getByRole("heading", { name: "Service Pillars" })
      .closest("section");
    expect(pillars).not.toBeNull();
    expect(pillars).toHaveAttribute("id", "service-pillars");

    pillarGroups.forEach((name) =>
      expect(within(pillars!).getByRole("heading", { name })).toBeVisible(),
    );
    serviceNames.forEach((name) =>
      expect(within(pillars!).getByRole("heading", { name })).toBeVisible(),
    );
    expect(within(pillars!).getAllByRole("article")).toHaveLength(11);
    expect(
      within(pillars!).getByRole("link", {
        name: /Africa Market Entry programme details/i,
      }),
    ).toHaveAttribute("href", "/africa-market-entry-programme");
  });

  it("uses only approved local media with meaningful alternative text", () => {
    const { container } = render(<ServicesPage />);
    const images = Array.from(container.querySelectorAll("img"));
    const sources = decodeURIComponent(
      images.map((image) => image.getAttribute("src")).join(" "),
    );

    expect(images).toHaveLength(2);
    expect(sources).toContain("/images/home/african-city-twilight.jpg");
    expect(sources).toContain("/images/home/strategic-adviser.jpg");
    expect(sources).not.toMatch(
      /01-full|02-full|googleusercontent|https?:|data:/i,
    );
    images.forEach((image) =>
      expect(image.getAttribute("alt")?.trim()).toBeTruthy(),
    );
  });

  it("uses the required safe CTA destinations and no placeholder or fabricated links", () => {
    const { container } = render(<ServicesPage />);
    expect(
      screen.getAllByRole("link", { name: "Strategy Consultation Details" }),
    ).toHaveLength(2);
    screen
      .getAllByRole("link", { name: "Strategy Consultation Details" })
      .forEach((link) =>
        expect(link).toHaveAttribute("href", "/#consultation"),
      );
    expect(
      screen.getByRole("link", { name: "Explore Service Pillars" }),
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
    expect(container.textContent).not.toMatch(prohibitedClaims);
    [
      "Infrastructure",
      "Financial Services",
      "Energy",
      "Agriculture",
      "Technology",
    ].forEach((sector) =>
      expect(within(sectorSection!).getByText(sector)).toBeVisible(),
    );
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

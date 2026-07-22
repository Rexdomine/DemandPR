import { render, screen, within } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import AboutPage, { metadata } from "./page";

const sectionHeadings = [
  "Bridging Ambition with African Opportunity",
  "Relationship-Led Expansion",
  "Vision & Mission",
  "Foundational Values",
  "Why Clients Work With Us",
  "The Strategic Journey",
  "Global Reach",
  "Senior-Led Advisory",
  "Retained Partnership Model",
  "Ready to Expand into Africa?",
] as const;

const values = [
  "Integrity",
  "Strategic Clarity",
  "Relationship Stewardship",
  "International Perspective",
  "Execution Focus",
  "Long-Term Partnership",
] as const;

const journey = [
  "Understand Objectives",
  "Identify Markets and Opportunities",
  "Build Strategic Relationships",
  "Facilitate Introductions",
  "Coordinate Delivery",
  "Provide Ongoing Support",
] as const;

const regions = [
  "United Kingdom",
  "Europe",
  "Africa",
  "United States",
] as const;

const prohibitedClaims =
  /For client review|premier|definitive bridge|established excellence|market authority|unmatched|proven|exclusive|decades of combined experience|over two decades|priority access|entire regional network|strategic war-room|decision-makers|government officials|influencers|de-risk|profitability|market leadership|guaranteed success|registered in/i;

describe("About Demand PR page", () => {
  it("provides the approved ten-section narrative, one H1 and named main landmark", () => {
    const { container } = render(<AboutPage />);
    const main = screen.getByRole("main");

    expect(main).toHaveAttribute("id", "main-content");
    expect(main).toHaveClass("about-page");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(container.querySelectorAll("main > section")).toHaveLength(10);
    sectionHeadings.forEach((name, index) => {
      expect(
        screen.getByRole("heading", { level: index === 0 ? 1 : 2, name }),
      ).toBeVisible();
    });
  });

  it("includes all approved values, journey steps and regions", () => {
    render(<AboutPage />);
    for (const label of [...values, ...journey, ...regions]) {
      expect(screen.getByRole("heading", { name: label })).toBeVisible();
    }
    const visionSection = screen
      .getByRole("heading", { name: "Vision & Mission" })
      .closest("section");
    expect(visionSection).not.toBeNull();
    expect(
      within(visionSection!).getByRole("heading", { name: "Vision" }),
    ).toBeVisible();
    expect(
      within(visionSection!).getByRole("heading", { name: "Mission" }),
    ).toBeVisible();
  });

  it("uses only approved local media with meaningful alt text", () => {
    const { container } = render(<AboutPage />);

    expect(
      screen.getByRole("img", {
        name: /african adviser sharing a city perspective/i,
      }),
    ).toBeInTheDocument();

    const images = Array.from(container.querySelectorAll("img"));
    const sources = images.map((image) => {
      const renderedSource = image.getAttribute("src") ?? "";
      return renderedSource.startsWith("/_next/image")
        ? (new URL(renderedSource, "https://demand.test").searchParams.get(
            "url",
          ) ?? "")
        : (renderedSource.split("?")[0] ?? "");
    });

    expect(images).toHaveLength(1);
    expect(sources).toEqual(["/images/about/context-made-practical.webp"]);
    expect(images[0]).toHaveAttribute(
      "alt",
      "An African adviser explaining agritech equipment to two business leaders in a greenhouse",
    );
    expect(images[0]).toHaveAttribute(
      "sizes",
      "(min-width: 961px) 44vw, 100vw",
    );
    for (const image of images) {
      expect(image).toHaveAttribute("alt");
      expect(image.getAttribute("alt")?.trim().length).toBeGreaterThan(10);
    }
    expect(sources.join(" ")).not.toMatch(
      /market-entry-hero|market-entry-infrastructure|strategic-partnership|strategic-adviser|googleusercontent|https?:|data:/i,
    );
  });

  it("keeps publication-safe copy, capability-led advisory and valid CTA routes", () => {
    const { container } = render(<AboutPage />);

    expect(container.textContent).not.toMatch(prohibitedClaims);
    expect(
      screen.queryByText(/managing director|head of regional|sector leads/i),
    ).not.toBeInTheDocument();
    expect(
      container.querySelector('a[href="#"], a[href=""]'),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Discuss a Retained Partnership" }),
    ).toHaveAttribute("href", "/contact");
    expect(
      screen.getByRole("link", { name: "Strategy Consultation Details" }),
    ).toHaveAttribute("href", "/contact");
    expect(
      screen.getByRole("link", { name: "Explore the Market Entry Programme" }),
    ).toHaveAttribute("href", "/africa-market-entry-programme");
    for (const link of screen.getAllByRole("link")) {
      expect(link.getAttribute("href")).toMatch(/^\/(?:[^#]|#.+)/);
    }
  });

  it("publishes truthful page-specific metadata and canonical route", () => {
    expect(metadata.title).toBe("About");
    expect(metadata.description).toMatch(/international business consultancy/i);
    expect(metadata.alternates).toEqual({ canonical: "/about" });
  });

  it("has no detectable automated accessibility violations", async () => {
    const { container } = render(<AboutPage />);
    expect((await axe(container)).violations).toEqual([]);
  });
});

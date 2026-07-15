import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import MarketEntryPage, { metadata } from "./page";

const sectionHeadings = [
  "Enter African Markets with Clarity, Confidence and the Right Connections",
  "Navigating the African Opportunity",
  "Who We Partner With",
  "A Systematic 6‑Step Framework",
  "Strategic Service Suite",
  "Partnership Built Around Your Ambition",
  "Sector Specialisation",
  "The Demand PR Edge",
  "Frequently Asked Questions",
  "Ready to Navigate the African Opportunity?",
] as const;

const prohibitedClaims =
  /For client review|Series B|proprietary data|12 (?:primary )?(?:African )?markets|24 (?:African )?nations|hubs include|legal presence|physical and legal presence|premier|unrivalled|world(?:'|’)s last (?:great )?growth frontier|strategy@demandpr\.africa|newsletter/i;

describe("Africa Market Entry Programme page", () => {
  it("provides the ten-section narrative, one H1 and a single named main landmark", () => {
    const { container } = render(<MarketEntryPage />);

    expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(container.querySelectorAll("main > section")).toHaveLength(10);
    sectionHeadings.forEach((name, index) => {
      expect(
        screen.getByRole("heading", { level: index === 0 ? 1 : 2, name }),
      ).toBeVisible();
    });
  });

  it("uses approved assets, content boundaries and resolving CTA destinations", () => {
    const { container } = render(<MarketEntryPage />);
    const sources = Array.from(container.querySelectorAll("img"), (image) =>
      image.getAttribute("src"),
    ).join(" ");

    expect(sources).toContain("market-entry-guided-arrival.webp");
    expect(sources).toContain("market-entry-local-intelligence.webp");
    expect(sources).toContain("market-entry-logistics-execution.webp");
    expect(sources).toContain("market-entry-partnership-in-practice.webp");
    expect(container.textContent).not.toMatch(prohibitedClaims);
    expect(container.querySelector('a[href="#"]')).not.toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: /strategy consultation/i }),
    ).not.toHaveLength(0);
    screen
      .getAllByRole("link", { name: /strategy consultation/i })
      .forEach((link) => expect(link).toHaveAttribute("href", "/contact"));
    for (const link of screen.getAllByRole("link")) {
      expect(link.getAttribute("href")).toMatch(/^\/(?:[^#]|#.+)/);
    }
  });

  it("uses keyboard-operable disclosure semantics and exposes FAQ state", async () => {
    const user = userEvent.setup();
    render(<MarketEntryPage />);
    const faq = screen
      .getByRole("heading", { name: "Frequently Asked Questions" })
      .closest("section");
    expect(faq).not.toBeNull();
    const disclosures = within(faq!).getAllByRole("group");
    expect(disclosures).toHaveLength(3);
    const first = disclosures[0]!;
    const summary = within(first).getByText("Which markets do you support?");
    expect(first).not.toHaveAttribute("open");
    await user.click(summary);
    expect(first).toHaveAttribute("open");
  });

  it("publishes page-specific metadata and canonical route", () => {
    expect(metadata.title).toBe("Africa Market Entry Programme");
    expect(metadata.description).toMatch(/market-entry/i);
    expect(metadata.alternates).toEqual({
      canonical: "/africa-market-entry-programme",
    });
  });

  it("has no detectable automated accessibility violations", async () => {
    const { container } = render(<MarketEntryPage />);
    expect((await axe(container)).violations).toEqual([]);
  });
});

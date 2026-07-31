import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Footer } from "./footer";

const sectors = [
  "Infrastructure",
  "Financial Services",
  "Energy",
  "Agriculture",
  "Technology",
] as const;

describe("Footer navigation", () => {
  it("uses the approved logo asset on a home link", () => {
    render(<Footer />);
    const brand = screen.getByRole("link", { name: "Demand PR home" });

    expect(brand.querySelector("img")).toHaveAttribute(
      "src",
      "/brand/demandpr-logo.svg",
    );
    expect(brand.querySelector("img")).toHaveAttribute("alt", "");
  });

  it("uses the existing public pages as meaningful Explore destinations", () => {
    render(<Footer />);
    const explore = screen.getByRole("navigation", { name: "Explore" });

    expect(
      within(explore).getByRole("link", { name: "Africa Market Entry" }),
    ).toHaveAttribute("href", "/africa-market-entry-programme");
    expect(
      within(explore).getByRole("link", { name: "Our Services" }),
    ).toHaveAttribute("href", "/services");
    expect(
      within(explore).getByRole("link", { name: "About Demand PR" }),
    ).toHaveAttribute("href", "/about");
    expect(
      within(explore).getByRole("link", { name: "Contact & Consultation" }),
    ).toHaveAttribute("href", "/contact");
  });

  it("presents sectors as information and offers one honest sector-expertise link", () => {
    render(<Footer />);
    const sectorRegion = screen.getByRole("region", { name: "Sectors" });

    sectors.forEach((sector) => {
      const item = within(sectorRegion).getByText(sector).closest("li");
      expect(item).not.toBeNull();
      expect(within(item!).queryByRole("link")).not.toBeInTheDocument();
    });
    expect(
      within(sectorRegion).getByRole("link", {
        name: "Explore our sector expertise",
      }),
    ).toHaveAttribute("href", "/services#sector-expertise");
  });

  it("keeps the consultation destination and returns to the current page content", () => {
    render(<Footer />);

    expect(
      screen.getByRole("link", { name: "Strategy Consultation Details" }),
    ).toHaveAttribute("href", "/contact");
    expect(screen.getByRole("link", { name: /Back to top/i })).toHaveAttribute(
      "href",
      "#main-content",
    );
  });
});

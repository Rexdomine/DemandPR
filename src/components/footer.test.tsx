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

  it("publishes the five approved social profiles as safe accessible links", () => {
    render(<Footer />);

    const profiles = [
      [
        "Follow Demand PR on Instagram",
        "https://www.instagram.com/demandpruk?igsh=MWcxa3Y5d2Juejlseg==",
      ],
      [
        "Connect with Demand PR on LinkedIn",
        "https://www.linkedin.com/in/maureen-bond-21375926?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      ],
      [
        "Follow Demand PR on Facebook",
        "https://www.facebook.com/share/16Y49Pk14c/",
      ],
      [
        "Follow Demand PR on X",
        "https://x.com/demandprltd?t=6dhLt2XKfKOPpbqVjBdLXA&s=09",
      ],
      ["Follow Demand PR on Threads", "https://www.threads.net/@demandpruk"],
    ] as const;

    profiles.forEach(([name, href]) => {
      const link = screen.getByRole("link", { name });
      expect(link).toHaveAttribute("href", href);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      expect(link.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    });

    const instagram = screen.getByRole("link", {
      name: "Follow Demand PR on Instagram",
    });
    expect(
      instagram.querySelector('[data-instagram-frame="true"]'),
    ).toBeTruthy();
    expect(
      instagram.querySelector('[data-instagram-lens="true"]'),
    ).toBeTruthy();
    expect(
      instagram.querySelector('[data-instagram-flash="true"]'),
    ).toBeTruthy();
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

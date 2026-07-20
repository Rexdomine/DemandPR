import { render, screen, within } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import ContactPage, { metadata } from "./page";

const headings = [
  "Let’s Discuss Your Africa Market Entry and Growth Objectives",
  "A Clear Route from Objectives to Next Steps",
  "What Helps Us Prepare",
  "Explore Before You Enquire",
] as const;

const prohibited =
  /For client review|within 24 hours|legal professional privilege|NDA|institutional-grade|London|Lagos|Nairobi|instant availability|scheduler|Client Login|newsletter|strategy@|WhatsApp us|\+\d[\d\s()-]{7,}/i;

describe("Contact & Consultation page", () => {
  it("renders the four-section visual narrative, one H1 and the complete form", () => {
    const { container } = render(<ContactPage />);
    expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
    expect(container.querySelectorAll("main > section")).toHaveLength(4);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    headings.forEach((name, index) =>
      expect(
        screen.getByRole("heading", { level: index === 0 ? 1 : 2, name }),
      ).toBeVisible(),
    );
    expect(
      screen.getByRole("form", { name: /consultation enquiry/i }),
    ).toBeVisible();
  });

  it("explains the truthful three-step process and disconnected form boundary", () => {
    render(<ContactPage />);
    for (const name of [
      "Share Your Objectives",
      "Review and Scope",
      "Agree the Next Step",
    ]) {
      expect(screen.getByRole("heading", { level: 3, name })).toBeVisible();
    }
    expect(
      screen.getByText(/validates locally.*not.*send or store/i),
    ).toBeVisible();
  });

  it("uses one publication-reviewed local consultation hero and safe public copy", () => {
    const { container } = render(<ContactPage />);
    const images = Array.from(container.querySelectorAll("img"));
    expect(images).toHaveLength(1);
    expect(decodeURIComponent(images[0]?.getAttribute("src") ?? "")).toContain(
      "/images/contact/purposeful-conversation.webp",
    );
    expect(images[0]).toHaveClass("contact-hero-image");
    expect(images[0]).toHaveAttribute(
      "alt",
      "An African business adviser in conversation with an executive in a contemporary terrace setting",
    );
    expect(images[0]).toHaveAttribute("sizes", "100vw");
    expect(
      decodeURIComponent(images[0]?.getAttribute("src") ?? ""),
    ).not.toMatch(/african-city-twilight|googleusercontent|https?:|data:/i);
    expect(container.textContent).not.toMatch(prohibited);
    expect(container.innerHTML).not.toMatch(
      /googleusercontent|contact-hero-source|https?:\/\//i,
    );
  });

  it("replaces direct-channel and calendar placeholders with preparation and exploration", () => {
    render(<ContactPage />);
    const prepare = screen
      .getByRole("heading", { name: "What Helps Us Prepare" })
      .closest("section");
    expect(prepare).not.toBeNull();
    for (const heading of [
      "Commercial Objective",
      "Target Markets",
      "Timing and Context",
      "Preferred Follow-up",
    ]) {
      expect(
        within(prepare!).getByRole("heading", { name: heading }),
      ).toBeVisible();
    }
    expect(
      screen.getByRole("link", { name: /explore services/i }),
    ).toHaveAttribute("href", "/services");
    expect(
      screen.getByRole("link", { name: /market entry programme/i }),
    ).toHaveAttribute("href", "/africa-market-entry-programme");
  });

  it("publishes canonical contact metadata", () => {
    expect(metadata.title).toBe("Contact & Consultation");
    expect(metadata.description).toMatch(/objectives|consultation/i);
    expect(metadata.alternates).toEqual({ canonical: "/contact" });
  });

  it("has no detectable automated accessibility violations", async () => {
    const { container } = render(<ContactPage />);
    expect((await axe(container)).violations).toEqual([]);
  });
});

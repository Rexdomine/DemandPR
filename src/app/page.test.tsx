import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import Home from "./page";

describe("homepage", () => {
  it("uses a clear landmark and heading structure", () => {
    render(<Home />);
    expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", {
        name: "Expand into Africa with Confidence",
      }),
    ).toBeVisible();
    for (const name of [
      "The Sophisticated Navigator for African Markets",
      "Strategic Solutions for Seamless Entry",
      "The Competitive Advantage",
      "Delivering Tangible Commercial Outcomes",
      "Capabilities in Action",
      "Strategic Continuity Across African Markets",
      "Ready to Expand into Africa?",
    ]) {
      expect(screen.getByRole("heading", { level: 2, name })).toBeVisible();
    }
    expect(document.querySelectorAll("main > section")).toHaveLength(8);
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
          "A diverse team collaborating in a contemporary workspace",
        )
        .getAttribute("src"),
    ).toBe(
      "/_next/image?url=%2Fimages%2Fhome%2Finnovation-team-neutral.jpg&w=3840&q=75",
    );
  });

  it("does not publish unsupported claims or review placeholders", () => {
    const { container } = render(<Home />);
    expect(container.textContent).not.toMatch(
      /15\+|Est\. 2014|accredited advis(?:e|o)rs|12 (?:key )?(?:regional )?hubs|24 (?:African )?nations|elite network access|For client review|launch configuration/i,
    );
    expect(
      screen.getAllByText(/illustrative capability/i).length,
    ).toBeGreaterThan(0);
  });

  it("has no detectable automated accessibility violations", async () => {
    const { container } = render(<Home />);
    const results = await axe(container);
    expect(results.violations).toEqual([]);
  });
});

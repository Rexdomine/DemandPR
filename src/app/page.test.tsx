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
      "Why Clients Choose Demand PR",
      "Delivering Commercial Outcomes",
      "Featured Success Stories",
      "Ongoing Representation Across Africa",
      "Ready to Expand into Africa?",
    ]) {
      expect(screen.getByRole("heading", { level: 2, name })).toBeVisible();
    }
  });

  it("has no detectable automated accessibility violations", async () => {
    const { container } = render(<Home />);
    const results = await axe(container);
    expect(results.violations).toEqual([]);
  });
});

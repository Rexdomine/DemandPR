import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Header } from "./header";

async function openMenu() {
  const user = userEvent.setup();
  const toggle = screen.getByRole("button", { name: "Open navigation" });
  await user.click(toggle);
  return { user, toggle };
}

describe("Header mobile navigation", () => {
  it("opens, moves focus, closes with Escape and restores focus", async () => {
    render(<Header />);
    const { user, toggle } = await openMenu();

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("navigation", { name: "Mobile navigation" }),
    ).toBeVisible();
    expect(
      screen.getByRole("button", { name: "Close navigation" }),
    ).toHaveFocus();

    await user.keyboard("{Escape}");
    expect(
      screen.queryByRole("navigation", { name: "Mobile navigation" }),
    ).not.toBeInTheDocument();
    expect(toggle).toHaveFocus();
  });

  it("traps focus in both directions and locks background scrolling", async () => {
    render(<Header />);
    const { user } = await openMenu();
    const close = screen.getByRole("button", { name: "Close navigation" });
    const dialog = screen.getByRole("dialog", { name: "Site navigation" });
    const consultation = within(dialog).getByRole("link", {
      name: "Book a Consultation",
    });

    expect(document.body.style.overflow).toBe("hidden");
    await user.keyboard("{Shift>}{Tab}{/Shift}");
    expect(consultation).toHaveFocus();
    await user.tab();
    expect(close).toHaveFocus();
  });

  it("closes after mobile navigation selection and restores scroll", async () => {
    render(<Header />);
    const { user } = await openMenu();
    const mobileNavigation = screen.getByRole("navigation", {
      name: "Mobile navigation",
    });

    await user.click(
      within(mobileNavigation).getByRole("link", { name: "About" }),
    );
    expect(mobileNavigation).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");
  });

  it("exposes the brand and valid same-page navigation targets", () => {
    render(<Header />);
    const brand = screen.getByRole("link", { name: "Demand PR home" });
    expect(brand).toBeVisible();
    expect(brand.querySelector("img")).toHaveAttribute(
      "src",
      "/brand/demandpr-logo.svg",
    );
    expect(brand.querySelector("img")).toHaveAttribute("alt", "");
    const navigation = screen.getByRole("navigation", {
      name: "Primary navigation",
    });
    expect(
      Array.from(navigation.querySelectorAll("a"), (link) => link.textContent),
    ).toEqual([
      "Home",
      "Services",
      "Market Entry Programme",
      "About",
      "Contact",
    ]);
    for (const link of navigation.querySelectorAll("a")) {
      expect(link.getAttribute("href")).toMatch(/^\/(?:#.*|[^#].*)?$/);
    }
    expect(
      within(navigation).getByRole("link", { name: "Market Entry Programme" }),
    ).toHaveAttribute("href", "/africa-market-entry-programme");
    expect(
      within(navigation).getByRole("link", { name: "Services" }),
    ).toHaveAttribute("href", "/services");
    expect(
      within(navigation).getByRole("link", { name: "About" }),
    ).toHaveAttribute("href", "/about");
    expect(
      within(navigation).getByRole("link", { name: "Contact" }),
    ).toHaveAttribute("href", "/contact");
  });

  it("ships the exact approved outlined SVG without active or external content", () => {
    const logo = readFileSync(
      join(process.cwd(), "public/brand/demandpr-logo.svg"),
    );
    const source = logo.toString("utf8");

    expect(createHash("sha256").update(logo).digest("hex")).toBe(
      "68a6bb9350d1b7ebd9324e5fe23acf5c2ff3a58a4de40e1759d30aa90b561fd2",
    );
    expect(source).toContain('viewBox="0 0 1296 388"');
    expect(source).toContain('fill="#6A1B2D"');
    expect(source).toContain('fill="#D4B16A"');
    expect(source).not.toMatch(
      /<script\b|<foreignObject\b|\son\w+\s*=|javascript:|(?:href|xlink:href)\s*=\s*["'](?:https?:|data:)/i,
    );
    expect(source).not.toMatch(/<(?:text|image|filter)\b/i);
  });

  it("uses the central consultation destination on desktop and mobile", async () => {
    render(<Header />);
    expect(
      screen.getByRole("link", { name: "Book a Consultation" }),
    ).toHaveAttribute("href", "/contact");
    await openMenu();
    expect(
      within(screen.getByRole("dialog", { name: "Site navigation" })).getByRole(
        "link",
        { name: "Book a Consultation" },
      ),
    ).toHaveAttribute("href", "/contact");
  });
});

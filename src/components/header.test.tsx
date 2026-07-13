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
      name: "Strategy Consultation Details",
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
    expect(screen.getByRole("link", { name: "Demand PR home" })).toBeVisible();
    const navigation = screen.getByRole("navigation", {
      name: "Primary navigation",
    });
    for (const link of navigation.querySelectorAll("a")) {
      expect(link.getAttribute("href")).toMatch(/^\/(?:#.*)?$/);
    }
  });
});

import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const css = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");
const authoredBrandSources = [
  css,
  readFileSync(join(process.cwd(), "src/lib/contact-api.ts"), "utf8"),
  readFileSync(join(process.cwd(), "tailwind.config.ts"), "utf8"),
].join("\n");

function token(name: string) {
  const value = css.match(new RegExp(`--${name}:\\s*(#[\\da-f]{6})`, "i"))?.[1];
  expect(value, `missing --${name}`).toBeDefined();
  return value!;
}

function luminance(hex: string) {
  const channels = hex
    .slice(1)
    .match(/.{2}/g)!
    .map((part) => Number.parseInt(part, 16) / 255)
    .map((channel) =>
      channel <= 0.04045
        ? channel / 12.92
        : Math.pow((channel + 0.055) / 1.055, 2.4),
    );
  return 0.2126 * channels[0]! + 0.7152 * channels[1]! + 0.0722 * channels[2]!;
}

function contrast(foreground: string, background: string) {
  const [light, dark] = [luminance(foreground), luminance(background)].sort(
    (left, right) => right - left,
  );
  return (light! + 0.05) / (dark! + 0.05);
}

describe("Burgundy and Champagne visual system", () => {
  it("declares the locked brands and complete semantic roles", () => {
    expect(token("brand-primary").toUpperCase()).toBe("#6A1B2D");
    expect(token("brand-accent").toUpperCase()).toBe("#D4B16A");

    for (const name of [
      "brand-primary-deep",
      "surface-canvas",
      "surface-raised",
      "surface-subtle",
      "surface-accent-soft",
      "text-strong",
      "text-body",
      "text-muted",
      "text-inverse",
      "border-subtle",
      "border-strong",
      "action-primary-bg",
      "action-primary-hover",
      "focus-ring",
      "status-error",
      "status-success",
      "overlay-hero",
      "shadow-color",
    ]) {
      token(name);
    }
  });

  it("removes the legacy blue, navy, teal and old-gold authored palette", () => {
    expect(authoredBrandSources).not.toMatch(
      /--(?:navy|navy-soft|teal|teal-dark|gold|ivory|porcelain|blue-wash|graphite|muted)\s*:/i,
    );
    expect(authoredBrandSources).not.toMatch(
      /#(?:071a2b|12324a|007c7c|006f70|c9a45c|eef6fd|f4f9ff|e5f2fd|dce9f3|64dcda|63dad8|55d6d4|68d9d8|71dedc|79dfdc)\b/i,
    );
    expect(authoredBrandSources).not.toMatch(/rgba\(246,\s*250,\s*255/i);
  });

  it("keeps all declared normal-text pairs at WCAG AA contrast", () => {
    const pairs = [
      [token("text-body"), token("surface-canvas")],
      [token("text-strong"), token("surface-raised")],
      [token("text-muted"), token("surface-subtle")],
      [token("text-inverse"), token("brand-primary")],
      [token("text-inverse"), token("action-primary-bg")],
      [token("brand-primary"), token("brand-accent")],
    ];

    for (const [foreground, background] of pairs) {
      expect(contrast(foreground!, background!)).toBeGreaterThanOrEqual(4.5);
    }
  });

  it("keeps responsive gradients syntactically valid", () => {
    expect(css).not.toMatch(/rgba\([^)]*\),\s*[\d.]+\)/i);
  });

  it("keeps outline button hover text visible on light backgrounds", () => {
    expect(css).toMatch(
      /\.market-entry-outline-button:hover\s*\{[^}]*background:\s*white;[^}]*color:\s*var\(--brand-primary-deep\)/s,
    );
  });

  it("keeps strong control boundaries at WCAG non-text contrast", () => {
    expect(
      contrast(token("border-strong"), token("surface-raised")),
    ).toBeGreaterThanOrEqual(3);
  });

  it("uses semantic light surfaces and reserves Burgundy for shared dark anchors", () => {
    expect(css).toMatch(/body\s*\{[^}]*background:\s*var\(--surface-canvas\)/s);
    expect(css).toMatch(
      /\.site-header\s*\{[^}]*color:\s*var\(--text-strong\)/s,
    );
    expect(css).toMatch(
      /\.service-card\.featured\s*\{[^}]*background:\s*var\(--surface-raised\)/s,
    );
    expect(css).toMatch(
      /\.contact-form\s*\{[^}]*background:\s*var\(--surface-raised\)/s,
    );
    expect(css).toMatch(
      /\.mobile-menu\s*\{[^}]*background:\s*var\(--brand-primary-deep\)/s,
    );
    expect(css).toMatch(
      /\.site-footer\s*\{[^}]*background:\s*var\(--brand-primary-deep\)/s,
    );
    expect(css).toMatch(
      /\.contact-submit-note\s*\{[^}]*color:\s*var\(--text-muted\)/s,
    );
  });

  it("keeps route editorial sections light except each route's selected anchor", () => {
    for (const pattern of [
      /\.advantage-section\s*\{[^}]*background:\s*var\(--surface-accent-soft\)/s,
      /\.market-entry-partners\s*\{[^}]*background:\s*var\(--surface-canvas\)/s,
      /\.market-entry-engagement\s*\{[^}]*background:\s*var\(--surface-accent-soft\)/s,
      /\.about-purpose,\s*\.about-reach\s*\{[^}]*background:\s*var\(--surface-subtle\)/s,
    ]) {
      expect(css).toMatch(pattern);
    }

    for (const selector of [
      "\\.retainer-section",
      "\\.services-retained",
      "\\.about-retained",
      "\\.contact-explore",
    ]) {
      expect(css).toMatch(
        new RegExp(
          `${selector}\\s*\\{[^}]*background:\\s*var\\(--brand-primary-deep\\)`,
          "s",
        ),
      );
    }
  });
});

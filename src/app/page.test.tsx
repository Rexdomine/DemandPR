import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import Home from "./page";

function webpContract(buffer: Buffer) {
  expect(buffer.subarray(0, 4).toString("ascii")).toBe("RIFF");
  expect(buffer.subarray(8, 12).toString("ascii")).toBe("WEBP");

  const chunks: string[] = [];
  let offset = 12;

  while (offset + 8 <= buffer.length) {
    const type = buffer.subarray(offset, offset + 4).toString("ascii");
    const length = buffer.readUInt32LE(offset + 4);
    chunks.push(type);

    if (type === "VP8 ") {
      const payload = offset + 8;
      expect(buffer.subarray(payload + 3, payload + 6).toString("hex")).toBe(
        "9d012a",
      );
      return {
        chunks,
        width: buffer.readUInt16LE(payload + 6) & 0x3fff,
        height: buffer.readUInt16LE(payload + 8) & 0x3fff,
      };
    }

    offset += 8 + length + (length % 2);
  }

  throw new Error("WebP VP8 dimensions could not be read");
}

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
          "Senior African market adviser in a burgundy suit leading a private executive consultation",
        )
        .getAttribute("src"),
    ).toContain("demand-pr-owner-strategic-counsel.webp");
    const sources = images.map((image) => image.getAttribute("src") ?? "");
    for (const filename of [
      "navigator-cultural-intelligence.webp",
      "trade-delegation-access.webp",
      "investment-forum-orchestration.webp",
      "sector-entry-field-advisory.webp",
      "regulatory-navigation-guidance.webp",
    ]) {
      expect(sources.some((source) => source.includes(filename))).toBe(true);
    }
  });

  it("bundles the exact approved owner-likeness hero derivative", () => {
    const image = readFileSync(
      join(
        process.cwd(),
        "public/images/home/demand-pr-owner-strategic-counsel.webp",
      ),
    );

    expect(webpContract(image)).toEqual({
      chunks: ["VP8 "],
      width: 1280,
      height: 658,
    });
    expect(createHash("sha256").update(image).digest("hex")).toBe(
      "4db70448731c94ba13f335ce3aa5610a166c8e616dbfa8d2e5090ed8ee7fb0b0",
    );
    expect(image.byteLength).toBeLessThan(50_000);
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

  it("preserves the consultation bridge with a real contact destination", () => {
    const { container } = render(<Home />);
    expect(container.querySelector("#consultation")).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "Strategy Consultation Details" }),
    ).not.toHaveLength(0);
    screen
      .getAllByRole("link", { name: "Strategy Consultation Details" })
      .forEach((link) => expect(link).toHaveAttribute("href", "/contact"));
  });

  it("has no detectable automated accessibility violations", async () => {
    const { container } = render(<Home />);
    const results = await axe(container);
    expect(results.violations).toEqual([]);
  });
});

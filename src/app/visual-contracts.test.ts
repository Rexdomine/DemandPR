import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

function jpegDimensions(buffer: Buffer) {
  let offset = 2;

  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = buffer.readUInt8(offset + 1);
    const length = buffer.readUInt16BE(offset + 2);
    const isStartOfFrame = marker >= 0xc0 && marker <= 0xc3;

    if (isStartOfFrame) {
      return {
        height: buffer.readUInt16BE(offset + 5),
        width: buffer.readUInt16BE(offset + 7),
      };
    }

    offset += 2 + length;
  }

  throw new Error("JPEG dimensions could not be read");
}

function webpContract(buffer: Buffer) {
  expect(buffer.subarray(0, 4).toString("ascii")).toBe("RIFF");
  expect(buffer.readUInt32LE(4)).toBe(buffer.byteLength - 8);
  expect(buffer.subarray(8, 12).toString("ascii")).toBe("WEBP");

  const chunks: string[] = [];
  let dimensions: { width: number; height: number } | undefined;
  let offset = 12;

  while (offset + 8 <= buffer.length) {
    const type = buffer.subarray(offset, offset + 4).toString("ascii");
    const length = buffer.readUInt32LE(offset + 4);
    const payload = offset + 8;
    expect(payload + length).toBeLessThanOrEqual(buffer.length);
    chunks.push(type);

    if (type === "VP8 ") {
      expect(buffer.subarray(payload + 3, payload + 6).toString("hex")).toBe(
        "9d012a",
      );
      dimensions = {
        width: buffer.readUInt16LE(payload + 6) & 0x3fff,
        height: buffer.readUInt16LE(payload + 8) & 0x3fff,
      };
    }

    offset += 8 + length + (length % 2);
  }

  expect(offset).toBe(buffer.length);
  if (!dimensions) throw new Error("WebP VP8 dimensions could not be read");

  return { chunks, ...dimensions };
}

function relativeLuminance(hex: string) {
  const channels = hex
    .replace("#", "")
    .match(/.{2}/g)
    ?.map((channel) => Number.parseInt(channel, 16) / 255);

  if (!channels || channels.length !== 3) throw new Error("Invalid hex colour");

  const converted = channels.map((channel) =>
    channel <= 0.04045
      ? channel / 12.92
      : Math.pow((channel + 0.055) / 1.055, 2.4),
  );
  const red = converted[0]!;
  const green = converted[1]!;
  const blue = converted[2]!;

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrastRatio(foreground: string, background: string) {
  const values = [
    relativeLuminance(foreground),
    relativeLuminance(background),
  ].sort((left, right) => right - left);

  return (values[0]! + 0.05) / (values[1]! + 0.05);
}

describe("site visual contracts", () => {
  it("keeps the public team image cropped to the sanitised photograph", () => {
    const image = readFileSync(
      join(process.cwd(), "public/images/home/innovation-team-neutral.jpg"),
    );

    expect(jpegDimensions(image)).toEqual({ width: 424, height: 700 });
    expect(createHash("sha256").update(image).digest("hex")).toBe(
      "43a65cea1c0c1b476ce9ccab8ae41be302a6a1347fe3fca2d1178b708870fc6b",
    );
    expect(image.includes(Buffer.from("Lavc"))).toBe(false);
    expect(image.includes(Buffer.from([0xff, 0xfe]))).toBe(false);
  });

  it("keeps primary button colours above WCAG AA normal-text contrast", () => {
    const css = readFileSync(
      join(process.cwd(), "src/app/globals.css"),
      "utf8",
    );
    const primaryAction = css.match(
      /--action-primary-bg:\s*(#[\da-f]{6})/i,
    )?.[1];

    expect(primaryAction?.toUpperCase()).toBe("#6A1B2D");
    expect(contrastRatio("#ffffff", primaryAction!)).toBeGreaterThanOrEqual(
      4.5,
    );
  });

  it("keeps in-page destinations clear of the sticky site header", () => {
    const css = readFileSync(
      join(process.cwd(), "src/app/globals.css"),
      "utf8",
    );

    expect(css).toMatch(
      /\.services-sectors\s*\{[^}]*scroll-margin-top:\s*(?:[7-9]|\d{2,})rem;/s,
    );
  });

  it("bundles the declared design fonts locally", () => {
    for (const file of [
      "inter-400.ttf",
      "inter-500.ttf",
      "inter-600.ttf",
      "inter-700.ttf",
      "sora-400.ttf",
      "sora-600.ttf",
      "sora-700.ttf",
      "sora-800.ttf",
    ]) {
      const font = readFileSync(join(process.cwd(), "public/fonts", file));

      expect(font.byteLength).toBeGreaterThan(40_000);
      expect(font.subarray(0, 4).toString("hex")).toBe("00010000");
    }
  });

  it("keeps the About and Contact hero image layers painted above their section backgrounds", () => {
    const css = readFileSync(
      join(process.cwd(), "src/app/globals.css"),
      "utf8",
    );

    expect(css).toContain(
      'background-image: url("/images/about/cross-border-perspective.webp");',
    );
    expect(css).toMatch(/\.about-hero-overlay\s*\{[^}]*z-index:\s*11;/s);
    expect(css).toMatch(
      /\.about-hero-content\s*\{[^}]*position:\s*relative;[^}]*z-index:\s*12;/s,
    );
    expect(css).toMatch(/\.contact-hero-image\s*\{[^}]*z-index:\s*10;/s);
    expect(css).toMatch(/\.contact-hero-shade\s*\{[^}]*z-index:\s*11;/s);
    expect(css).toMatch(
      /\.contact-hero-content\s*\{[^}]*position:\s*relative;[^}]*z-index:\s*12;/s,
    );
    expect(css).toMatch(/\.contact-hero\s*\{[^}]*min-height:\s*auto;/s);
    expect(css).toMatch(
      /@media \(max-width:\s*960px\)[\s\S]*?\.contact-hero\s*\{[^}]*padding-top:\s*26rem;/,
    );
    expect(css).toContain("padding-top: calc(56.25vw - 1rem);");
    expect(css).toContain("height: 56.25vw !important;");
  });

  it("pins the publication-reviewed About and Contact WebP assets", () => {
    const assets = [
      {
        path: "public/images/about/cross-border-perspective.webp",
        dimensions: { width: 1536, height: 864 },
        hash: "1dd81fb09cb71884762a17fbee8ecb8ebace5ec0ee146edd91ed27da4dabe63d",
        maxBytes: 80_000,
      },
      {
        path: "public/images/about/context-made-practical.webp",
        dimensions: { width: 1254, height: 1254 },
        hash: "7dd6f039df7725fcd98ca9e5eaa408a882f4b5d622431ed2caec6f2578174ed1",
        maxBytes: 120_000,
      },
      {
        path: "public/images/contact/purposeful-conversation.webp",
        dimensions: { width: 1536, height: 864 },
        hash: "9a69bdd487bdd0061bda89be98ba942b276d5b97dba44cd4f1c6160c1ecddc59",
        maxBytes: 50_000,
      },
    ] as const;

    for (const asset of assets) {
      const image = readFileSync(join(process.cwd(), asset.path));
      expect(webpContract(image)).toEqual({
        chunks: ["VP8 "],
        ...asset.dimensions,
      });
      expect(createHash("sha256").update(image).digest("hex")).toBe(asset.hash);
      expect(image.byteLength).toBeLessThan(asset.maxBytes);
    }
  });
});

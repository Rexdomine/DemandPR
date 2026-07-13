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

describe("homepage visual contracts", () => {
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
    const teal = css.match(/--teal:\s*(#[\da-f]{6})/i)?.[1];

    expect(teal).toBeDefined();
    expect(contrastRatio("#ffffff", teal!)).toBeGreaterThanOrEqual(4.5);
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
});

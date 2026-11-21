import { describe, expect, test } from "bun:test";
import { bannerLines, colorBannerLines } from "../src/banner.ts";

describe("bannerLines", () => {
  test("is 8 lines or fewer, each 56 columns or less", () => {
    expect(bannerLines.length).toBeGreaterThan(0);
    expect(bannerLines.length).toBeLessThanOrEqual(8);
    for (const line of bannerLines) {
      expect([...line].length).toBeLessThanOrEqual(56);
    }
  });

  test("has no escape codes", () => {
    expect(bannerLines.some((line) => line.includes("\x1b"))).toBe(false);
  });
});

describe("colorBannerLines", () => {
  test("keeps the plain text when color is off", () => {
    expect(colorBannerLines(bannerLines, "none")).toEqual([...bannerLines]);
  });

  test("wraps each line in color codes when color is on", () => {
    const colored = colorBannerLines(bannerLines, "256");
    expect(colored.length).toBe(bannerLines.length);
    for (const line of colored) {
      expect(line.startsWith("\x1b[38;5;")).toBe(true);
      expect(line.endsWith("\x1b[0m")).toBe(true);
    }
  });
});

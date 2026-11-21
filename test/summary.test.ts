import { describe, expect, test } from "bun:test";
import { bannerLines } from "../src/banner.ts";
import { buildSummary, type SummaryInput } from "../src/summary.ts";

const baseInput: SummaryInput = {
  folder: "my-app",
  fileNames: ["package.json", "src/main.ts"],
  version: "0.1.0-beta.1",
  colorMode: "none",
  showBanner: false,
};

const plainPattern = /\x1b\[[0-9;]*m/g;

function plain(text: string): string {
  return text.replace(plainPattern, "");
}

describe("buildSummary with color off", () => {
  test("has no escape codes and no banner", () => {
    const text = buildSummary({ ...baseInput, showBanner: false });
    expect(text.includes("\x1b")).toBe(false);
    expect(text.includes(bannerLines[1])).toBe(false);
  });

  test("shows the banner without colors when asked", () => {
    const text = buildSummary({ ...baseInput, showBanner: true });
    expect(text.includes("\x1b")).toBe(false);
    expect(text.includes(bannerLines[1])).toBe(true);
  });
});

describe("buildSummary with truecolor", () => {
  test("uses 24-bit codes and ends every line with reset", () => {
    const text = buildSummary({ ...baseInput, colorMode: "truecolor", showBanner: true });
    expect(text).toContain("\x1b[38;2;");

    for (const line of text.split("\n")) {
      if (line.includes("\x1b") && line !== "") {
        expect(line.endsWith("\x1b[0m")).toBe(true);
      }
    }
  });
});

describe("buildSummary content", () => {
  test("prints the command line exactly", () => {
    const lines = plain(buildSummary(baseInput)).split("\n");
    expect(lines).toContain("      cd my-app && bun install && bun run dev");
  });

  test("lists the created files and the version", () => {
    const text = plain(buildSummary(baseInput));
    expect(text).toContain("Lusia 0.1.0-beta.1");
    expect(text).toContain("Created my-app/");
    expect(text).toContain("package.json  src/main.ts");
  });

  test("keeps every line within 70 columns", () => {
    const text = plain(buildSummary({ ...baseInput, showBanner: true }));
    for (const line of text.split("\n")) {
      expect(line.length).toBeLessThanOrEqual(70);
    }
  });
});

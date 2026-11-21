import { describe, expect, test } from "bun:test";
import { canShowBanner, detectColorMode } from "../src/terminal.ts";

describe("detectColorMode", () => {
  test("is none when stdout is not a terminal", () => {
    expect(detectColorMode({ COLORTERM: "truecolor" }, false)).toBe("none");
  });

  test("is none when NO_COLOR is set", () => {
    expect(detectColorMode({ NO_COLOR: "1" }, true)).toBe("none");
  });

  test("is none when TERM is dumb", () => {
    expect(detectColorMode({ TERM: "dumb" }, true)).toBe("none");
  });

  test("is truecolor when COLORTERM says so", () => {
    expect(detectColorMode({ COLORTERM: "truecolor" }, true)).toBe("truecolor");
    expect(detectColorMode({ COLORTERM: "24bit" }, true)).toBe("truecolor");
  });

  test("falls back to 256 colors", () => {
    expect(detectColorMode({ TERM: "xterm-256color" }, true)).toBe("256");
  });
});

describe("canShowBanner", () => {
  test("needs a terminal and at least 60 columns", () => {
    expect(canShowBanner(true, 60)).toBe(true);
    expect(canShowBanner(true, 59)).toBe(false);
    expect(canShowBanner(true, undefined)).toBe(false);
    expect(canShowBanner(false, 120)).toBe(false);
  });
});

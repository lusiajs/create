import { describe, expect, test } from "bun:test";
import { shellQuote } from "../src/shell-quote.ts";

describe("shellQuote", () => {
  test("leaves a plain name unchanged", () => {
    expect(shellQuote("my-app")).toBe("my-app");
  });

  test("wraps a name with a space in double quotes", () => {
    expect(shellQuote("my app")).toBe('"my app"');
  });

  test("escapes a double quote", () => {
    expect(shellQuote('say "hi"')).toBe('"say \\"hi\\""');
  });

  test("escapes a dollar sign", () => {
    expect(shellQuote("$HOME")).toBe('"\\$HOME"');
  });
});

import { describe, expect, test } from "bun:test";
import { defaultOptions, optionToggles, optionsFromToggles, parseArgs } from "../src/options.ts";
import {
  keyFromInput,
  moveCursor,
  renderToggles,
  toggleAtCursor,
  wrapText,
  type Toggle,
  type ToggleState,
} from "../src/prompt/toggles.ts";

const sampleToggles: Toggle[] = [
  { id: "first", label: "First", description: "One", checked: false },
  { id: "second", label: "Second", description: "Two", checked: true },
];

describe("parseArgs", () => {
  test("reads the folder and no flags", () => {
    expect(parseArgs(["my-app"])).toEqual({ folder: "my-app", flags: {}, unknownFlags: [] });
  });

  test("reads the animate space flags in any position", () => {
    expect(parseArgs(["--animate-space", "my-app"]).flags).toEqual({ animateSpace: true });
    expect(parseArgs(["my-app", "--no-animate-space"]).flags).toEqual({ animateSpace: false });
  });

  test("collects unknown flags", () => {
    expect(parseArgs(["--fast", "my-app"]).unknownFlags).toEqual(["--fast"]);
  });

  test("does not treat object property names as flags", () => {
    expect(parseArgs(["constructor"]).flags).toEqual({});
  });
});

describe("option toggles", () => {
  test("start from the defaults, with animate space off", () => {
    expect(defaultOptions.animateSpace).toBe(false);
    expect(optionToggles(defaultOptions)).toEqual([
      {
        id: "animateSpace",
        label: "Animate space",
        description:
          "When an element is added or removed, nearby elements slide to their new place instead of jumping.",
        checked: false,
      },
    ]);
  });

  test("turn checked rows back into options", () => {
    const toggles = optionToggles({ animateSpace: false }).map((toggle) => ({
      ...toggle,
      checked: true,
    }));
    expect(optionsFromToggles(toggles)).toEqual({ animateSpace: true });
  });
});

describe("toggle keys", () => {
  test("maps arrows, space, enter and ctrl-c", () => {
    expect(keyFromInput("\x1b[A")).toBe("up");
    expect(keyFromInput("\x1b[B")).toBe("down");
    expect(keyFromInput(" ")).toBe("space");
    expect(keyFromInput("\r")).toBe("enter");
    expect(keyFromInput("\x03")).toBe("interrupt");
    expect(keyFromInput("x")).toBe("other");
  });
});

describe("toggle state", () => {
  const start: ToggleState = { toggles: sampleToggles, cursor: 0 };

  test("moves the cursor and stops at the ends", () => {
    expect(moveCursor(start, 1).cursor).toBe(1);
    expect(moveCursor(start, 5).cursor).toBe(1);
    expect(moveCursor(start, -1).cursor).toBe(0);
  });

  test("toggles only the row under the cursor", () => {
    const toggled = toggleAtCursor(start);
    expect(toggled.toggles.map((toggle) => toggle.checked)).toEqual([true, true]);
    expect(sampleToggles[0].checked).toBe(false);
  });
});

describe("renderToggles", () => {
  test("marks the selected row and its box", () => {
    const lines = renderToggles({ toggles: sampleToggles, cursor: 1 }, 80, "none");
    expect(lines).toContain("> [x] Second");
    expect(lines).toContain("  [ ] First");
  });

  test("wraps descriptions to the width", () => {
    expect(wrapText("one two three four", 9)).toEqual(["one two", "three", "four"]);
  });
});

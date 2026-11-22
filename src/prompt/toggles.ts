import { boldCode, dimCode, styled } from "../ansi.ts";
import type { ColorMode } from "../terminal.ts";

export type Toggle = {
  id: string;
  label: string;
  description: string;
  checked: boolean;
};

export type ToggleState = {
  toggles: Toggle[];
  cursor: number;
};

type Key = "up" | "down" | "space" | "enter" | "interrupt" | "other";

const hint = "Up/down move, space toggles, enter confirms";
const hideCursor = "\x1b[?25l";
const showCursor = "\x1b[?25h";
const descriptionIndent = "      ";
const minimumWidth = 40;

export function keyFromInput(input: string): Key {
  if (input === "\x1b[A") return "up";
  if (input === "\x1b[B") return "down";
  if (input === " ") return "space";
  if (input === "\r" || input === "\n") return "enter";
  if (input === "\x03") return "interrupt";
  return "other";
}

export function moveCursor(state: ToggleState, step: number): ToggleState {
  const last = state.toggles.length - 1;
  const cursor = Math.min(Math.max(state.cursor + step, 0), last);
  return { ...state, cursor };
}

export function toggleAtCursor(state: ToggleState): ToggleState {
  const toggles = state.toggles.map((toggle, index) =>
    index === state.cursor ? { ...toggle, checked: !toggle.checked } : toggle,
  );
  return { ...state, toggles };
}

export function wrapText(text: string, width: number): string[] {
  const lines: string[] = [];
  let current = "";
  for (const word of text.split(" ")) {
    if (current !== "" && current.length + 1 + word.length > width) {
      lines.push(current);
      current = word;
    } else {
      current = current === "" ? word : `${current} ${word}`;
    }
  }
  if (current !== "") lines.push(current);
  return lines;
}

export function renderToggles(state: ToggleState, width: number, colorMode: ColorMode): string[] {
  const textWidth = Math.max(width, minimumWidth) - descriptionIndent.length;
  const lines = [styled(hint, [dimCode], colorMode), ""];
  state.toggles.forEach((toggle, index) => {
    const selected = index === state.cursor;
    const marker = selected ? ">" : " ";
    const box = toggle.checked ? "[x]" : "[ ]";
    const label = `${marker} ${box} ${toggle.label}`;
    lines.push(selected ? styled(label, [boldCode], colorMode) : label);
    for (const line of wrapText(toggle.description, textWidth)) {
      lines.push(styled(`${descriptionIndent}${line}`, [dimCode], colorMode));
    }
  });
  return lines;
}

export function runToggles(
  toggles: Toggle[],
  colorMode: ColorMode,
  output: NodeJS.WriteStream = process.stdout,
  input: NodeJS.ReadStream = process.stdin,
): Promise<Toggle[]> {
  return new Promise((resolve, reject) => {
    let state: ToggleState = { toggles, cursor: 0 };
    const width = output.columns ?? minimumWidth;
    const lineCount = renderToggles(state, width, colorMode).length;

    const draw = (redraw: boolean): void => {
      const lines = renderToggles(state, width, colorMode);
      const moveUp = redraw ? `\x1b[${lineCount}A\r\x1b[J` : "";
      output.write(`${moveUp}${lines.map((line) => `${line}\n`).join("")}`);
    };

    const finish = (): void => {
      input.off("data", onData);
      input.setRawMode(false);
      input.pause();
      output.write(showCursor);
    };

    const onData = (chunk: Buffer): void => {
      const key = keyFromInput(chunk.toString());
      if (key === "enter") {
        finish();
        resolve(state.toggles);
      } else if (key === "interrupt") {
        finish();
        reject(new Error("Cancelled"));
      } else {
        state = applyKey(state, key);
        draw(true);
      }
    };

    output.write(hideCursor);
    input.setRawMode(true);
    input.resume();
    input.on("data", onData);
    draw(false);
  });
}

function applyKey(state: ToggleState, key: Key): ToggleState {
  if (key === "up") return moveCursor(state, -1);
  if (key === "down") return moveCursor(state, 1);
  if (key === "space") return toggleAtCursor(state);
  return state;
}

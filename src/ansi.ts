import type { ColorMode } from "./terminal.ts";

export type Rgb = [number, number, number];

export type Color = { rgb: Rgb; index256: number };

export const resetCode = "\x1b[0m";
export const boldCode = "\x1b[1m";
export const dimCode = "\x1b[2m";

export function foregroundCode(color: Color, mode: ColorMode): string {
  if (mode === "truecolor") return `\x1b[38;2;${color.rgb.join(";")}m`;
  if (mode === "256") return `\x1b[38;5;${color.index256}m`;
  return "";
}

export function styled(text: string, codes: string[], mode: ColorMode): string {
  if (mode === "none" || codes.length === 0) return text;
  return `${codes.join("")}${text}${resetCode}`;
}

export function endLine(line: string, mode: ColorMode): string {
  if (mode === "none" || line === "" || line.endsWith(resetCode)) return line;
  return `${line}${resetCode}`;
}

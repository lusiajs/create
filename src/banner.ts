import { type Color, type Rgb, foregroundCode, styled } from "./ansi.ts";
import type { ColorMode } from "./terminal.ts";

export const bannerLines: readonly string[] = [
  " ▄   ▄",
  "██▄ ▄██            ██╗     ██╗   ██╗███████╗██╗ █████╗",
  "███▄███            ██║     ██║   ██║██╔════╝██║██╔══██╗",
  "███████      ▄█▀   ██║     ██║   ██║███████╗██║███████║",
  "███████      ██    ██║     ██║   ██║╚════██║██║██╔══██║",
  "███████      ███   ███████╗╚██████╔╝███████║██║██║  ██║",
  "███████████████    ╚══════╝ ╚═════╝ ╚══════╝╚═╝╚═╝  ╚═╝",
  "█████████████▀▀",
];

const topRgb: Rgb = [255, 126, 182];
const bottomRgb: Rgb = [182, 156, 255];
const pinkRgb: Rgb = [255, 135, 255];
const lavenderRgb: Rgb = [215, 175, 255];

export function colorBannerLines(lines: readonly string[], mode: ColorMode): string[] {
  return lines.map((line, index) =>
    styled(line, [foregroundCode(bannerColor(index, lines.length), mode)], mode),
  );
}

function bannerColor(lineIndex: number, lineCount: number): Color {
  const ratio = lineCount > 1 ? lineIndex / (lineCount - 1) : 0;
  const rgb = mixRgb(topRgb, bottomRgb, ratio);
  return { rgb, index256: nearestIndex256(rgb) };
}

function mixRgb(from: Rgb, to: Rgb, ratio: number): Rgb {
  const channel = (index: number): number =>
    Math.round(from[index] + (to[index] - from[index]) * ratio);
  return [channel(0), channel(1), channel(2)];
}

function nearestIndex256(rgb: Rgb): number {
  return squaredDistance(rgb, pinkRgb) <= squaredDistance(rgb, lavenderRgb) ? 213 : 183;
}

function squaredDistance(first: Rgb, second: Rgb): number {
  return first.reduce((sum, value, index) => sum + (value - second[index]) ** 2, 0);
}

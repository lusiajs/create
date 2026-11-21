import { fnv1a } from "./hash.ts";

export type Rgb = [number, number, number];

export const resetColor = "\x1b[0m";

export const levelColor = {
  info: "\x1b[36m",
  warn: "\x1b[33m",
  error: "\x1b[31m",
};

const pastelSaturation = 0.6;
const pastelLightness = 0.75;

export function categoryColor(category: string): string {
  const hue = fnv1a(category) % 360;
  const [red, green, blue] = hslToRgb(hue, pastelSaturation, pastelLightness);
  return `\x1b[38;2;${red};${green};${blue}m`;
}

export function hslToRgb(hue: number, saturation: number, lightness: number): Rgb {
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const huePrime = hue / 60;
  const secondary = chroma * (1 - Math.abs((huePrime % 2) - 1));
  const match = lightness - chroma / 2;
  const [red, green, blue] = rgbForSector(Math.floor(huePrime), chroma, secondary);
  return [red + match, green + match, blue + match].map((value) => Math.round(value * 255)) as Rgb;
}

function rgbForSector(sector: number, chroma: number, secondary: number): Rgb {
  switch (sector) {
    case 0:
      return [chroma, secondary, 0];
    case 1:
      return [secondary, chroma, 0];
    case 2:
      return [0, chroma, secondary];
    case 3:
      return [0, secondary, chroma];
    case 4:
      return [secondary, 0, chroma];
    default:
      return [chroma, 0, secondary];
  }
}

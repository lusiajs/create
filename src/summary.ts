import { bannerLines, colorBannerLines } from "./banner.ts";
import { type Color, boldCode, dimCode, endLine, foregroundCode, styled } from "./ansi.ts";
import { shellQuote } from "./shell-quote.ts";
import type { ColorMode } from "./terminal.ts";
import { wrapNames } from "./wrap-names.ts";

export type SummaryInput = {
  folder: string;
  fileNames: string[];
  version: string;
  colorMode: ColorMode;
  showBanner: boolean;
};

const margin = "  ";
const fileIndent = "      ";
const maxWidth = 70;
const guideLink = "https://lusia.azpepoze.com/guide";
const githubLink = "https://github.com/lusiajs/lusia";
const accentColor: Color = { rgb: [255, 126, 182], index256: 211 };
const checkColor: Color = { rgb: [126, 231, 135], index256: 120 };

export function buildSummary(input: SummaryInput): string {
  const blocks = [
    ...(input.showBanner ? [bannerBlock(input.colorMode)] : []),
    titleBlock(input),
    createdBlock(input),
    startBlock(input),
    linksBlock(input.colorMode),
  ];
  const text = blocks
    .map((block) => block.map((line) => endLine(line, input.colorMode)).join("\n"))
    .join("\n\n");
  return `\n${text}\n`;
}

function bannerBlock(colorMode: ColorMode): string[] {
  return colorBannerLines(bannerLines, colorMode).map((line) => `${margin}${line}`);
}

function titleBlock({ version, colorMode }: SummaryInput): string[] {
  return [
    `${margin}${styled(`Lusia ${version}`, [boldCode], colorMode)}`,
    `${margin}Write UI in one file. Update it with variables.`,
    `${margin}Built for Bun.`,
  ];
}

function createdBlock({ folder, fileNames, colorMode }: SummaryInput): string[] {
  const check = styled("✔", [foregroundCode(checkColor, colorMode)], colorMode);
  const label = folder.replace(/[\\/]+$/, "");
  const fileLines = wrapNames(fileNames, maxWidth - fileIndent.length).map(
    (line) => `${fileIndent}${styled(line, [dimCode], colorMode)}`,
  );
  return [`${margin}${check} Created ${label}/`, ...fileLines];
}

function startBlock({ folder, colorMode }: SummaryInput): string[] {
  const command = `cd ${shellQuote(folder)} && bun install && bun run dev`;
  const styledCommand = styled(command, [boldCode, foregroundCode(accentColor, colorMode)], colorMode);
  return [`${margin}Start your app:`, "", `${fileIndent}${styledCommand}`];
}

function linksBlock(colorMode: ColorMode): string[] {
  return [linkLine("Guide", guideLink, colorMode), linkLine("GitHub", githubLink, colorMode)];
}

function linkLine(label: string, link: string, colorMode: ColorMode): string {
  return `${margin}${styled(label.padEnd(8), [dimCode], colorMode)}${link}`;
}

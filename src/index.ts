#!/usr/bin/env bun
import { resolve } from "node:path";
import { appNameFrom } from "./app-name.ts";
import { listCreatedFiles } from "./created-files.ts";
import {
  defaultOptions,
  optionToggles,
  optionsFromToggles,
  parseArgs,
  type CreateOptions,
  type ParsedArgs,
} from "./options.ts";
import { createLogger } from "./log.ts";
import { runToggles } from "./prompt/toggles.ts";
import { scaffold } from "./scaffold.ts";
import { buildSummary } from "./summary.ts";
import { canShowBanner, detectColorMode, type ColorMode } from "./terminal.ts";
import { readPackageVersion } from "./version.ts";

const log = createLogger("create");

async function main(): Promise<void> {
  const parsed = parseArgs(Bun.argv.slice(2));
  const folder = parsed.folder;
  if (!folder) {
    log.error("Usage: bun create lusiajs <folder>");
    process.exit(1);
  }
  if (parsed.unknownFlags.length > 0) {
    log.error(`Unknown option: ${parsed.unknownFlags.join(", ")}`);
    process.exit(1);
  }

  const isTerminal = Boolean(process.stdout.isTTY);
  const colorMode = detectColorMode(process.env, isTerminal);
  const options = await chooseOptions(parsed, colorMode);

  const target = resolve(folder);
  await scaffold(target, appNameFrom(folder), options);

  const summary = buildSummary({
    folder,
    fileNames: await listCreatedFiles(target),
    version: await readPackageVersion(),
    colorMode,
    showBanner: canShowBanner(isTerminal, process.stdout.columns),
  });
  process.stdout.write(summary);
}

async function chooseOptions(parsed: ParsedArgs, colorMode: ColorMode): Promise<CreateOptions> {
  const flagsGiven = Object.keys(parsed.flags).length > 0;
  if (flagsGiven || !process.stdin.isTTY) {
    return { ...defaultOptions, ...parsed.flags };
  }
  const toggles = await runToggles(optionToggles(defaultOptions), colorMode);
  return optionsFromToggles(toggles);
}

main().catch((error: unknown) => {
  log.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});

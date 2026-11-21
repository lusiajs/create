#!/usr/bin/env bun
import { resolve } from "node:path";
import { appNameFrom } from "./app-name.ts";
import { listCreatedFiles } from "./created-files.ts";
import { createLogger } from "./log.ts";
import { scaffold } from "./scaffold.ts";
import { buildSummary } from "./summary.ts";
import { canShowBanner, detectColorMode } from "./terminal.ts";
import { readPackageVersion } from "./version.ts";

const log = createLogger("create");

async function main(): Promise<void> {
  const folder = Bun.argv[2];
  if (!folder) {
    log.error("Usage: bun create lusiajs <folder>");
    process.exit(1);
  }

  const target = resolve(folder);
  await scaffold(target, appNameFrom(folder));

  const isTerminal = Boolean(process.stdout.isTTY);
  const summary = buildSummary({
    folder,
    fileNames: await listCreatedFiles(target),
    version: await readPackageVersion(),
    colorMode: detectColorMode(process.env, isTerminal),
    showBanner: canShowBanner(isTerminal, process.stdout.columns),
  });
  process.stdout.write(summary);
}

main().catch((error: unknown) => {
  log.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});

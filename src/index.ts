#!/usr/bin/env bun
import { resolve } from "node:path";
import { appNameFrom } from "./app-name.ts";
import { createLogger } from "./log.ts";
import { scaffold } from "./scaffold.ts";

const log = createLogger("create");

async function main(): Promise<void> {
  const folder = Bun.argv[2];
  if (!folder) {
    log.error("Usage: bun create lusia <folder>");
    process.exit(1);
  }

  await scaffold(resolve(folder), appNameFrom(folder));
  log.info(`Created ${folder}`);
  log.info("Next steps:");
  log.info(`  cd ${folder}`);
  log.info("  bun install");
  log.info("  bun run dev");
  process.exit(0);
}

main().catch((error: unknown) => {
  log.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});

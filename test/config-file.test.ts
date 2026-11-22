import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { writeConfigFile } from "../src/config-file.ts";
import { scaffold } from "../src/scaffold.ts";

let root: string;

beforeEach(async () => {
  root = await mkdtemp(join(tmpdir(), "create-config-"));
});

afterEach(async () => {
  await rm(root, { recursive: true, force: true });
});

describe("animate space config", () => {
  test("adds attach and detach animateSpace when on", async () => {
    const target = join(root, "on");
    await scaffold(target, "on", { animateSpace: true });

    const config = await readFile(join(target, "lusia.config.ts"), "utf8");
    expect(config).toContain("attach: { animateSpace: true }");
    expect(config).toContain("detach: { animateSpace: true }");
    expect(config).toContain('outdir: "dist"');
  });

  test("keeps the template config when off", async () => {
    const target = join(root, "off");
    await scaffold(target, "off", { animateSpace: false });

    const config = await readFile(join(target, "lusia.config.ts"), "utf8");
    expect(config).not.toContain("animateSpace");
  });

  test("writeConfigFile does nothing when the option is off", async () => {
    const target = join(root, "direct");
    await scaffold(target, "direct", { animateSpace: false });
    await writeConfigFile(target, { animateSpace: false });

    const config = await readFile(join(target, "lusia.config.ts"), "utf8");
    expect(config).not.toContain("animateSpace");
  });
});

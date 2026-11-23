import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { listCreatedFiles } from "../src/created-files.ts";
import { scaffold } from "../src/scaffold.ts";

let root: string;

beforeEach(async () => {
  root = await mkdtemp(join(tmpdir(), "create-files-"));
});

afterEach(async () => {
  await rm(root, { recursive: true, force: true });
});

describe("listCreatedFiles", () => {
  test("lists the scaffolded files, including package.json and src/main.ts", async () => {
    const target = join(root, "my-app");
    await scaffold(target, "my-app");

    const names = await listCreatedFiles(target);
    expect(names).toContain("package.json");
    expect(names).toContain("src/main.ts");
    expect(names).toContain(".gitignore");
    expect(names.length).toBeLessThanOrEqual(10);
  });
});

import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { existsSync } from "node:fs";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { appNameFrom } from "../src/app-name.ts";
import { scaffold } from "../src/scaffold.ts";

let root: string;

beforeEach(async () => {
  root = await mkdtemp(join(tmpdir(), "create-"));
});

afterEach(async () => {
  await rm(root, { recursive: true, force: true });
});

describe("scaffold", () => {
  test("creates the starter files and renames _gitignore", async () => {
    const target = join(root, "my-app");
    await scaffold(target, "my-app");

    for (const file of [
      "package.json",
      "lusia.config.ts",
      "index.html",
      "tsconfig.json",
      ".gitignore",
      "src/main.ts",
      "src/App.lusia",
    ]) {
      expect(existsSync(join(target, file))).toBe(true);
    }
    expect(existsSync(join(target, "_gitignore"))).toBe(false);
  });

  test("sets the package name to the app name", async () => {
    const target = join(root, "my-app");
    await scaffold(target, "demo-app");

    const packageJson = JSON.parse(await readFile(join(target, "package.json"), "utf8"));
    expect(packageJson.name).toBe("demo-app");
  });

  test("throws when the target folder is not empty", async () => {
    const target = join(root, "busy");
    await mkdir(target);
    await writeFile(join(target, "keep.txt"), "data");

    await expect(scaffold(target, "busy")).rejects.toThrow("Folder is not empty");
  });
});

describe("appNameFrom", () => {
  test("turns a folder name into an npm name", () => {
    expect(appNameFrom("My App")).toBe("my-app");
  });

  test("uses the last path segment", () => {
    expect(appNameFrom("/tmp/x/Demo")).toBe("demo");
  });
});

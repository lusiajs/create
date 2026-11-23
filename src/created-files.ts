import { readdir } from "node:fs/promises";
import { join } from "node:path";

const maxFileNames = 10;

export async function listCreatedFiles(folder: string): Promise<string[]> {
  const topLevelNames = await listShownFiles(folder);
  const sourceNames = (await listShownFiles(join(folder, "src"))).map((name) => `src/${name}`);
  return [...topLevelNames, ...sourceNames].slice(0, maxFileNames);
}

async function listShownFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && isShownName(entry.name))
    .map((entry) => entry.name)
    .sort();
}

function isShownName(name: string): boolean {
  return !name.startsWith(".") || name === ".gitignore";
}

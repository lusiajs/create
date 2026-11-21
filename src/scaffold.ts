import { cp, mkdir, readdir, readFile, rename, writeFile } from "node:fs/promises";
import { join } from "node:path";

const templateDirectory = join(import.meta.dir, "../template");

export async function scaffold(targetDirectory: string, appName: string): Promise<void> {
  await assertFolderIsEmpty(targetDirectory);
  await mkdir(targetDirectory, { recursive: true });
  await cp(templateDirectory, targetDirectory, { recursive: true });
  await rename(join(targetDirectory, "_gitignore"), join(targetDirectory, ".gitignore"));
  await setPackageName(targetDirectory, appName);
}

async function assertFolderIsEmpty(targetDirectory: string): Promise<void> {
  const entries = await listEntries(targetDirectory);
  if (entries.length > 0) {
    throw new Error(`Folder is not empty: ${targetDirectory}. Pick an empty folder.`);
  }
}

async function listEntries(directory: string): Promise<string[]> {
  try {
    return await readdir(directory);
  } catch (error) {
    if (isMissingError(error)) return [];
    throw error;
  }
}

function isMissingError(error: unknown): boolean {
  return error instanceof Error && "code" in error && error.code === "ENOENT";
}

async function setPackageName(directory: string, appName: string): Promise<void> {
  const packagePath = join(directory, "package.json");
  const packageJson: Record<string, unknown> = JSON.parse(await readFile(packagePath, "utf8"));
  packageJson.name = appName;
  await writeFile(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`);
}

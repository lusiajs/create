import { join } from "node:path";

const packagePath = join(import.meta.dir, "../package.json");

export async function readPackageVersion(): Promise<string> {
  const packageJson = (await Bun.file(packagePath).json()) as { version: string };
  return packageJson.version;
}

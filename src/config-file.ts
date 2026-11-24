import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { CreateOptions } from "./options.ts";

const configFileName = "lusia.config.ts";

const animateSpaceConfigSource = `import { defineConfig } from "lusiajs/config";

export default defineConfig({
  outdir: "dist",
  animate: {
    attach: { animateSpace: true },
    detach: { animateSpace: true },
  },
});
`;

/** Writes the config only when an option changes it; the template keeps its default file otherwise. */
export async function writeConfigFile(
  targetDirectory: string,
  options: CreateOptions,
): Promise<void> {
  if (!options.animateSpace) return;
  await writeFile(join(targetDirectory, configFileName), animateSpaceConfigSource);
}

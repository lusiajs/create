import { basename } from "node:path";

export function appNameFrom(folderArgument: string): string {
  const name = basename(folderArgument)
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9._~-]/g, "")
    .replace(/^[._]+/, "");
  if (name.length === 0) {
    throw new Error(`Cannot make an npm name from folder: ${folderArgument}`);
  }
  return name;
}

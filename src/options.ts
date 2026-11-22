import type { Toggle } from "./prompt/toggles.ts";

export type CreateOptions = {
  animateSpace: boolean;
};

export const defaultOptions: CreateOptions = {
  animateSpace: false,
};

export type ParsedArgs = {
  folder: string | undefined;
  flags: Partial<CreateOptions>;
  unknownFlags: string[];
};

const flagValues = new Map<string, Partial<CreateOptions>>([
  ["--animate-space", { animateSpace: true }],
  ["--no-animate-space", { animateSpace: false }],
]);

export function parseArgs(args: string[]): ParsedArgs {
  const parsed: ParsedArgs = { folder: undefined, flags: {}, unknownFlags: [] };
  for (const arg of args) {
    const flagValue = flagValues.get(arg);
    if (flagValue) {
      Object.assign(parsed.flags, flagValue);
    } else if (arg.startsWith("--")) {
      parsed.unknownFlags.push(arg);
    } else {
      parsed.folder ??= arg;
    }
  }
  return parsed;
}

const optionRows: Array<{ id: keyof CreateOptions; label: string; description: string }> = [
  {
    id: "animateSpace",
    label: "Animate space",
    description:
      "When an element is added or removed, nearby elements slide to their new place instead of jumping.",
  },
];

export function optionToggles(options: CreateOptions): Toggle[] {
  return optionRows.map((row) => ({
    id: row.id,
    label: row.label,
    description: row.description,
    checked: options[row.id],
  }));
}

export function optionsFromToggles(toggles: Toggle[]): CreateOptions {
  const checkedById = new Map(toggles.map((toggle) => [toggle.id, toggle.checked]));
  return { animateSpace: checkedById.get("animateSpace") ?? defaultOptions.animateSpace };
}

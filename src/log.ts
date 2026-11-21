import { categoryColor, levelColor, resetColor } from "./color.ts";

type Level = keyof typeof levelColor;

export type Logger = Record<Level, (message: string) => void>;

function colorsEnabled(): boolean {
  return Boolean(process.stderr.isTTY) && process.env.NO_COLOR === undefined;
}

function paint(text: string, color: string): string {
  return colorsEnabled() ? `${color}${text}${resetColor}` : text;
}

function timestamp(): string {
  return new Date().toTimeString().slice(0, 8);
}

function formatLine(level: Level, category: string, message: string): string {
  const levelText = paint(level.toUpperCase().padEnd(5), levelColor[level]);
  const categoryText = paint(category, categoryColor(category));
  return `${timestamp()} ${levelText} ${categoryText} ${message}`;
}

export function createLogger(category: string): Logger {
  const write = (level: Level, message: string): void => {
    process.stderr.write(`${formatLine(level, category, message)}\n`);
  };
  return {
    info: (message) => write("info", message),
    warn: (message) => write("warn", message),
    error: (message) => write("error", message),
  };
}

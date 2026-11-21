export type ColorMode = "truecolor" | "256" | "none";

export type Environment = Record<string, string | undefined>;

const minimumBannerColumns = 60;

export function detectColorMode(environment: Environment, isTerminal: boolean): ColorMode {
  if (!isTerminal || environment.NO_COLOR !== undefined || environment.TERM === "dumb") {
    return "none";
  }
  return supportsTrueColor(environment) ? "truecolor" : "256";
}

export function canShowBanner(isTerminal: boolean, columns: number | undefined): boolean {
  return isTerminal && (columns ?? 0) >= minimumBannerColumns;
}

function supportsTrueColor(environment: Environment): boolean {
  return environment.COLORTERM === "truecolor" || environment.COLORTERM === "24bit";
}

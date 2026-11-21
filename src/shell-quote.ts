const safePattern = /^[A-Za-z0-9_./:@%+,=~-]+$/;
const needsEscape = /["\\$`]/g;

export function shellQuote(value: string): string {
  if (safePattern.test(value)) return value;
  return `"${value.replace(needsEscape, "\\$&")}"`;
}

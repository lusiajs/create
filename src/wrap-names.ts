const separator = "  ";

export function wrapNames(names: string[], width: number): string[] {
  const lines: string[] = [];
  let current = "";
  for (const name of names) {
    if (current !== "" && current.length + separator.length + name.length > width) {
      lines.push(current);
      current = name;
    } else {
      current = current === "" ? name : `${current}${separator}${name}`;
    }
  }
  if (current !== "") lines.push(current);
  return lines;
}

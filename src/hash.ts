const offsetBasis = 0x811c9dc5;
const prime = 0x01000193;

export function fnv1a(text: string): number {
  let hash = offsetBasis;
  for (const byte of new TextEncoder().encode(text)) {
    hash = Math.imul(hash ^ byte, prime) >>> 0;
  }
  return hash;
}

export function normalizeLanguageTag(tag: string): string {
  return tag.trim().toLowerCase().replaceAll("_", "-");
}

import type { Language } from "@features/i18n";

export type LocalizedContent = Record<string, string>;

export function getContent(
  content: LocalizedContent | undefined,
  language: Language,
): string {
  if (!content) {
    return "";
  }

  return content[language] ?? content.en ?? Object.values(content)[0] ?? "";
}

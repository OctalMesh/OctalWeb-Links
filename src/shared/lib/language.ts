export const LANGUAGE_STORAGE_KEY = "language";

/**
 * Normalize language tags to standard format (lowercase with hyphens)
 */
export function normalizeLanguageTag(tag: string): string {
  return tag.trim().toLowerCase().replaceAll("_", "-");
}

/**
 * Resolve preferred language from stored value and browser preferences
 * Falls back to provided default if neither match
 */
export function resolvePreferredLanguage(
  storedLanguage: string | null | undefined,
  supportedLanguages: readonly string[],
  defaultLanguage: string,
): string {
  // Check if stored language is in supported languages
  if (
    storedLanguage &&
    supportedLanguages.some(
      (lang) =>
        normalizeLanguageTag(lang) === normalizeLanguageTag(storedLanguage),
    )
  ) {
    return normalizeLanguageTag(storedLanguage);
  }

  // Try to match browser preferred languages
  for (const browserLanguage of navigator.languages || []) {
    const normalized = normalizeLanguageTag(browserLanguage);
    const exactMatch = supportedLanguages.find(
      (lang) => normalizeLanguageTag(lang) === normalized,
    );

    if (exactMatch) {
      return normalizeLanguageTag(exactMatch);
    }

    // Try primary language tag (e.g., "en" from "en-US")
    const primaryTag = normalized.split("-")[0];
    const primaryMatch = supportedLanguages.find(
      (lang) => normalizeLanguageTag(lang) === primaryTag,
    );

    if (primaryMatch) {
      return normalizeLanguageTag(primaryMatch);
    }
  }

  return defaultLanguage;
}

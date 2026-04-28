import { type Language, isLanguage } from "../model/types";
import { i18nConfig } from "./i18n-config";

export const DEFAULT_LANGUAGE_FROM_CONFIG: Language = i18nConfig.defaultLanguage;

function normalizeLanguageTag(tag: string) {
  return tag.trim().toLowerCase().replaceAll("_", "-");
}

function matchSupportedLanguage(tag: string): Language | undefined {
  const normalized = normalizeLanguageTag(tag);
  const exactMatch = i18nConfig.languages.find((language) => language.code === normalized);

  if (exactMatch) {
    return exactMatch.code;
  }

  const primaryTag = normalized.split("-")[0];
  return isLanguage(primaryTag) ? primaryTag : undefined;
}

export function getBrowserPreferredLanguage(preferredLanguages: readonly string[] = []): Language {
  for (const languageTag of preferredLanguages) {
    const matchedLanguage = matchSupportedLanguage(languageTag);
    if (matchedLanguage) {
      return matchedLanguage;
    }
  }

  return DEFAULT_LANGUAGE_FROM_CONFIG;
}

export function resolvePreferredLanguage(
  storedLanguage: string | null | undefined,
  preferredLanguages: readonly string[] = [],
): Language {
  if (isLanguage(storedLanguage)) {
    return storedLanguage;
  }

  return getBrowserPreferredLanguage(preferredLanguages);
}

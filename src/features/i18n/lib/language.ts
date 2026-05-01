import { DEFAULT_LANGUAGE, type Language, isLanguage } from "../model/types";
import { getI18nConfig } from "./i18n-config";

function normalizeLanguageTag(tag: string) {
  return tag.trim().toLowerCase().replaceAll("_", "-");
}

function matchSupportedLanguage(tag: string): Language | undefined {
  const normalized = normalizeLanguageTag(tag);
  const exactMatch = getI18nConfig().languages.find(
    (language) => language.code === normalized,
  );

  if (exactMatch) {
    return exactMatch.code;
  }

  const primaryTag = normalized.split("-")[0];
  return isLanguage(primaryTag) ? primaryTag : undefined;
}

export function getBrowserPreferredLanguage(
  preferredLanguages: readonly string[] = [],
): Language {
  for (const languageTag of preferredLanguages) {
    const matchedLanguage = matchSupportedLanguage(languageTag);
    if (matchedLanguage) {
      return matchedLanguage;
    }
  }

  return DEFAULT_LANGUAGE;
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

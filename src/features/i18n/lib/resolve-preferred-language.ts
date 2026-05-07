import {
  DEFAULT_LANGUAGE,
  type Language,
  SUPPORTED_LANGUAGES,
} from "@shared/i18n/config";
import { isLanguage } from "@shared/i18n/lib/is-language";

import { normalizeLanguageTag } from "./normalize-language-tag";

export function resolvePreferredLanguage(
  storedLanguage: string | null | undefined,
  preferredLanguages: readonly string[] = [],
): Language {
  const supported = SUPPORTED_LANGUAGES.map(normalizeLanguageTag);

  if (storedLanguage) {
    const normalized = normalizeLanguageTag(storedLanguage);

    if (isLanguage(normalized)) {
      return normalized;
    }
  }

  for (const preferred of preferredLanguages) {
    const normalized = normalizeLanguageTag(preferred);

    if (supported.includes(normalized) && isLanguage(normalized)) {
      return normalized;
    }

    const primaryTag = normalized.split("-")[0] ?? "";

    if (supported.includes(primaryTag) && isLanguage(primaryTag)) {
      return primaryTag;
    }
  }

  return DEFAULT_LANGUAGE;
}

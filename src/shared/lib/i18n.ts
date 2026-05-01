import { getI18nConfig } from "@shared/lib/i18n-config";
import type { LanguageOption } from "@shared/lib/schema";

export type Language = string;

export type LanguageOptionItem = LanguageOption;

export const DEFAULT_LANGUAGE: Language = getI18nConfig().defaultLanguage;
export const LANGUAGE_STORAGE_KEY = "language";

export function isLanguage(
  value: string | null | undefined,
): value is Language {
  if (!value) {
    return false;
  }

  return getI18nConfig().languages.some((language) => language.code === value);
}

export { getI18nConfig };

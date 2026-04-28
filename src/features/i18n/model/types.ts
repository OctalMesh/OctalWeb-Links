import type { LanguageOption } from "@shared/lib/schema/i18n";

import { i18nConfig } from "../lib/i18n-config";

export type Language = string;

export type LanguageOptionItem = LanguageOption;

export const DEFAULT_LANGUAGE: Language = i18nConfig.defaultLanguage;
export const LANGUAGE_STORAGE_KEY = "language";

export function isLanguage(value: string | null | undefined): value is Language {
  if (!value) {
    return false;
  }

  return i18nConfig.languages.some((language) => language.code === value);
}

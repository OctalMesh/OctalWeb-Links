import { i18nConfig } from "@/features";
import { DEFAULT_LANGUAGE, type Language } from "@/features";

export const translations = i18nConfig.translations;

export function getTranslation(key: string, language: Language): string {
  return translations[language]?.[key] ?? translations[DEFAULT_LANGUAGE]?.[key] ?? translations.en?.[key] ?? key;
}

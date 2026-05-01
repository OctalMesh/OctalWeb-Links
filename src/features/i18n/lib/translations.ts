import { DEFAULT_LANGUAGE, type Language } from "../model/types";
import { getI18nConfig } from "./i18n-config";

export const translations = getI18nConfig().translations;

export function getTranslation(key: string, language: Language): string {
  return (
    translations[language]?.[key] ??
    translations[DEFAULT_LANGUAGE]?.[key] ??
    translations.en?.[key] ??
    key
  );
}

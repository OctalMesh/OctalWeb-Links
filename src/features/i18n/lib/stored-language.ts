import { DEFAULT_LANGUAGE, type Language } from "@shared/i18n";

import { resolvePreferredLanguage } from "./resolve-preferred-language";

export type LanguageListener = (language: Language) => void;

export const LANGUAGE_STORAGE_KEY = "language";
export const listeners = new Set<LanguageListener>();

export function readStoredLanguage(): Language {
  if (typeof window === "undefined") {
    return DEFAULT_LANGUAGE;
  }

  const documentLanguage = document.documentElement.lang || DEFAULT_LANGUAGE;

  return resolvePreferredLanguage(
    window.localStorage.getItem(LANGUAGE_STORAGE_KEY),
    [documentLanguage, ...getBrowserLanguages()],
  );
}

export function writeStoredLanguage(language: Language): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  document.documentElement.lang = language;

  listeners.forEach((listener) => listener(language));
  window.dispatchEvent(new CustomEvent("languagechange", { detail: language }));
}

function getBrowserLanguages(): readonly string[] {
  return typeof window === "undefined" ? [] : window.navigator.languages;
}

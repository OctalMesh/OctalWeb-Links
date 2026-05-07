"use client";

import { useSyncExternalStore } from "react";

import { DEFAULT_LANGUAGE, type Language } from "@shared/i18n";

import { readStoredLanguage, subscribeToLanguageChanges } from "../lib";

export function useLanguageStore(
  initialLanguage: Language = DEFAULT_LANGUAGE,
): Language {
  return useSyncExternalStore(
    subscribeToLanguageChanges,
    readStoredLanguage,
    () => initialLanguage,
  );
}

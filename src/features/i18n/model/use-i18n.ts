import * as React from "react";

import { DEFAULT_LANGUAGE, type Language } from "@shared/i18n";

import { type InterpolationParams, writeStoredLanguage } from "../lib";
import { t } from "../lib/translations";
import { useLanguageStore } from "./use-language-store";

export type TranslateFn = (key: string, params?: InterpolationParams) => string;

export function useI18n(initialLanguage: Language = DEFAULT_LANGUAGE): {
  language: Language;
  setLanguage: (language: Language) => void;
  t: TranslateFn;
} {
  const language = useLanguageStore(initialLanguage);

  const setLanguage = React.useCallback((nextLanguage: Language) => {
    writeStoredLanguage(nextLanguage);
  }, []);

  return {
    language,
    setLanguage,
    t: React.useCallback((key, params) => t(key, language, params), [language]),
  };
}

export function useT(): TranslateFn {
  return useI18n().t;
}

const I18N_CONFIG = {
  defaultLanguage: "uk",
  languages: [
    { code: "uk", region: "UA", label: "Українська" },
    { code: "en", region: "US", label: "English" },
  ],
} as const;

export type Language = (typeof I18N_CONFIG.languages)[number]["code"];

export type LanguageOptionItem = (typeof I18N_CONFIG.languages)[number];

export const DEFAULT_LANGUAGE = I18N_CONFIG.defaultLanguage satisfies Language;

export const SUPPORTED_LANGUAGES = I18N_CONFIG.languages.map(
  (l) => l.code,
) as Language[];

export function getI18nConfig() {
  return I18N_CONFIG;
}

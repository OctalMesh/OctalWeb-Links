export type Language = "en" | "uk";

export const LANGUAGES: Record<Language, string> = {
  en: "English",
  uk: "Українська",
};

export const DEFAULT_LANGUAGE: Language = "en";

export const LANGUAGE_STORAGE_KEY = "language";

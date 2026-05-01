export { getI18nConfig } from "@shared/lib/i18n";
export { getTranslation } from "./lib/translations";
export {
  getBrowserPreferredLanguage,
  resolvePreferredLanguage,
} from "./lib/language";

export {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  isLanguage,
  type Language,
  type LanguageOptionItem,
} from "@shared/lib/i18n";

export { LanguageSwitcher } from "./ui/language-switcher";

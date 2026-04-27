import type { Language } from "@features/i18n";

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Footer
    "footer.theme": "Theme",
    "footer.language": "Language",
    "footer.copyright": "©",
    "footer.company": "OctalMesh",
    "footer.all_rights": "All rights reserved",
    "footer.official": "Official links and resources",
    "footer.status": "Status",
    "footer.online": "Online",
    "footer.version": "Version",
    "footer.contact": "Contact",
    "footer.theme_light": "Light",
    "footer.theme_dark": "Dark",
    "footer.theme_system": "System",
  },
  uk: {
    // Footer
    "footer.theme": "Тема",
    "footer.language": "Мова",
    "footer.copyright": "©",
    "footer.company": "OctalMesh",
    "footer.all_rights": "Всі права захищені",
    "footer.official": "Офіційні посилання та ресурси",
    "footer.status": "Статус",
    "footer.online": "Онлайн",
    "footer.version": "Версія",
    "footer.contact": "Контакт",
    "footer.theme_light": "Світла",
    "footer.theme_dark": "Темна",
    "footer.theme_system": "Система",
  },
};

export function getTranslation(key: string, language: Language): string {
  return translations[language]?.[key] ?? translations.en[key] ?? key;
}

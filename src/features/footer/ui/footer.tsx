"use client";

import * as React from "react";

import { LanguageSwitcher } from "@features/footer";
import { LANGUAGES, LANGUAGE_STORAGE_KEY, getTranslation } from "@features/i18n";
import type { Language } from "@features/i18n";
import { ThemeTogglerButton } from "@features/theme-toggle/ui";

type FooterProps = {
  language?: Language;
};

const isLanguage = (value: string | null): value is Language => value === "en" || value === "uk";

export function Footer({ language: initialLanguage = "en" }: FooterProps) {
  const [language, setLanguage] = React.useState<Language>(initialLanguage);
  const year = new Date().getFullYear();
  const t = (key: string) => getTranslation(key, language);

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (isLanguage(stored)) {
      setLanguage(stored);
    }
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  return (
    <footer className="relative z-20 pb-10">
      <div className="container mx-auto max-w-7xl px-6">
        <div
          className={
            "flex flex-col gap-6 rounded-[2.5rem] border border-white/5 " +
            "backdrop-blur-sm bg-neutral-200/2 px-6 py-8 transition-all duration-500 " +
            "hover:border-white/15 hover:bg-white/5 " +
            "sm:flex-row sm:items-center sm:justify-between"
          }
        >
          {/* Left: Copyright Info */}
          <div className="flex flex-col gap-1 text-sm">
            <p className="text-sm text-foreground/90">
              {t("footer.copyright")} {year} {t("footer.company")}
            </p>
            <p className="text-xs text-muted-foreground/70">{t("footer.all_rights")}</p>
          </div>

          {/* Center: Divider (hidden on mobile) */}
          <div className="hidden h-8 w-px bg-white/10 sm:block" />

          {/* Right: Controls */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            {/* Theme Switcher */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">{t("footer.theme")}</span>
              <ThemeTogglerButton size="sm" variant="ghost" modes={["light", "dark", "system"]} />
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">{t("footer.language")}</span>
              <LanguageSwitcher language={language} onChange={setLanguage} labels={LANGUAGES} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import * as React from "react";

import { LanguageSwitcher } from "@features/footer";
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  type Language,
  getI18nConfig,
  getTranslation,
  resolvePreferredLanguage,
} from "@features/i18n";
import { ThemeTogglerButton } from "@features/theme-toggle/ui";

type FooterProps = {
  language?: Language;
};

function subscribeToLanguageChanges(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"],
  });

  window.addEventListener("storage", onStoreChange);

  return () => {
    observer.disconnect();
    window.removeEventListener("storage", onStoreChange);
  };
}

function getBrowserLanguageSnapshot() {
  if (typeof window === "undefined") {
    return DEFAULT_LANGUAGE;
  }

  const documentLanguage = document.documentElement.lang || DEFAULT_LANGUAGE;

  return resolvePreferredLanguage(window.localStorage.getItem(LANGUAGE_STORAGE_KEY), [
    documentLanguage,
    ...window.navigator.languages,
  ]);
}

export function Footer({ language: initialLanguage = DEFAULT_LANGUAGE }: FooterProps) {
  const language = React.useSyncExternalStore(
    subscribeToLanguageChanges,
    getBrowserLanguageSnapshot,
    () => initialLanguage,
  );
  const year = new Date().getFullYear();
  const i18nConfig = getI18nConfig();
  const t = (key: string) => getTranslation(key, language);

  const updateLanguage = React.useCallback((nextLanguage: string) => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    document.documentElement.lang = nextLanguage;
  }, []);

  return (
    <footer className="relative z-20 pb-10">
      <div className="container mx-auto max-w-7xl px-6">
        <div
          className={
            "flex flex-col gap-6 rounded-[2.5rem] border border-(--fx-card-border) " +
            "bg-(--fx-card-bg) px-6 py-8 backdrop-blur-sm transition-all duration-500 " +
            "hover:border-(--fx-card-border-hover) hover:bg-(--fx-card-bg-hover) " +
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
              <LanguageSwitcher language={language} onChange={updateLanguage} options={i18nConfig.languages} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

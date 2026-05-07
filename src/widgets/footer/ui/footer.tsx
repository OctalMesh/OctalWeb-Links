"use client";

import { LanguageSwitcher, useI18n } from "@features/i18n";
import { ThemeTogglerButton } from "@features/theme";

import { type Language, getI18nConfig } from "@shared/i18n";

export function Footer({
  initialLanguage,
}: { initialLanguage?: Language } = {}) {
  const { language, setLanguage, t } = useI18n(initialLanguage);
  const year = new Date().getFullYear();
  const i18nConfig = getI18nConfig();

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
              {t("common.footer.copyright")} {year} {t("common.footer.company")}
            </p>
            <p className="text-xs text-muted-foreground/70">
              {t("common.footer.all_rights")}
            </p>
          </div>

          {/* Center: Divider (hidden on mobile) */}
          <div className="hidden h-8 w-px bg-white/10 sm:block" />

          {/* Right: Controls */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            {/* Theme Switcher */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">
                {t("common.footer.theme")}
              </span>
              <ThemeTogglerButton
                size="sm"
                variant="ghost"
                modes={["light", "dark", "system"]}
              />
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">
                {t("common.footer.language")}
              </span>
              <LanguageSwitcher
                language={language}
                onChange={setLanguage}
                options={i18nConfig.languages}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

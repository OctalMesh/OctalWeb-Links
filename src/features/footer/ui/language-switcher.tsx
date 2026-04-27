"use client";

import type { Language } from "@features/i18n";

type LanguageSwitcherProps = {
  language: Language;
  onChange: (language: Language) => void;
  labels: Record<Language, string>;
};

export function LanguageSwitcher({ language, onChange, labels }: LanguageSwitcherProps) {
  return (
    <div className="flex items-center gap-2">
      {(Object.entries(labels) as Array<[Language, string]>).map(([lang, label]) => (
        <button
          key={lang}
          onClick={() => onChange(lang)}
          className={`px-3 py-1 rounded-md text-sm transition-all duration-200 ${
            language === lang
              ? "bg-accent text-accent-foreground font-medium"
              : "text-muted-foreground hover:text-foreground hover:bg-accent/20"
          }`}
          title={label}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

import React from "react";

import { Footer } from "@features/footer";
import { DEFAULT_LANGUAGE, type Language } from "@features/i18n";
import { ThemeProvider } from "@features/theme-toggle/providers";
import { VisualEffectsProvider } from "@features/visual-effects/providers/visual-effects-provider";

type AppProviderProps = {
  children: React.ReactNode;
  language?: Language;
};

export function AppProvider({ children, language = DEFAULT_LANGUAGE }: AppProviderProps) {
  return (
    <ThemeProvider>
      <div className="fixed h-screen w-full bg-[radial-gradient(ellipse_at_bottom,var(--fx-bg-start)_0%,var(--fx-bg-end)_100%)]" />
      <VisualEffectsProvider>
        <main className="relative z-10">{children}</main>
        <Footer language={language} />
      </VisualEffectsProvider>
    </ThemeProvider>
  );
}

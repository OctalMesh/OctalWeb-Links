import React from "react";

import { Footer } from "@widgets/footer";

import { DEFAULT_LANGUAGE, type Language } from "@features/i18n";
import { ThemeProvider } from "@features/theme";
import { VisualEffectsProvider } from "@features/visual-effects";

type AppProviderProps = {
  children: React.ReactNode;
  language?: Language;
};

export function AppProvider({
  children,
  language = DEFAULT_LANGUAGE,
}: AppProviderProps) {
  return (
    <ThemeProvider>
      <VisualEffectsProvider>
        {children}
        <Footer language={language} />
      </VisualEffectsProvider>
    </ThemeProvider>
  );
}

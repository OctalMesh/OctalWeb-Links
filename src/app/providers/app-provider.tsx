import React from "react";

import { Footer } from "@features/footer";
import { ThemeProvider } from "@features/theme-toggle/providers";
import { DEFAULT_LANGUAGE, type Language } from "@features/i18n/model/types";

type AppProviderProps = {
  children: React.ReactNode;
  language?: Language;
};

export function AppProvider({ children, language = DEFAULT_LANGUAGE }: AppProviderProps) {
  return (
    <ThemeProvider>
      {children}
      <Footer language={language} />
    </ThemeProvider>
  );
}

import React from "react";

import { Footer } from "@widgets/footer";

import { ThemeProvider } from "@features/theme";
import { VisualEffectsProvider } from "@features/visual-effects";

import { type Language } from "@shared/i18n";

export function AppProvider({
  children,
  initialLanguage,
}: {
  children: React.ReactNode;
  initialLanguage?: Language;
}) {
  return (
    <ThemeProvider>
      <VisualEffectsProvider>
        {children}
        <Footer initialLanguage={initialLanguage} />
      </VisualEffectsProvider>
    </ThemeProvider>
  );
}

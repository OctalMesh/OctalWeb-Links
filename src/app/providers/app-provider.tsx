import React from "react";

import { Footer } from "@features/footer";
import type { Language } from "@features/i18n";
import { VisualEffectsProvider } from "@features/visual-effects/providers/visual-effects-provider";

import { ThemeProvider } from "./theme";

type AppProviderProps = {
  children: React.ReactNode;
  language?: Language;
};

export function AppProvider({ children, language = "en" }: AppProviderProps) {
  return (
    <>
      <div className="fixed w-full h-screen bg-[radial-gradient(ellipse_at_bottom,#262626_0%,#000_100%)]" />
      <ThemeProvider>
        <VisualEffectsProvider>
          <main className="relative z-10">{children}</main>
          <Footer language={language} />
        </VisualEffectsProvider>
      </ThemeProvider>
    </>
  );
}

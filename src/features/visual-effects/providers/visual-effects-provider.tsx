import React from "react";

import {
  TransitionProvider,
  useScrollAnimation,
} from "@features/visual-effects";

import { BackgroundGrid, BackgroundStars, Cursor } from "@shared/ui";

export function VisualEffectsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useScrollAnimation();

  return (
    <TransitionProvider>
      <BackgroundStars className="w-full h-auto min-h-dvh">
        <BackgroundGrid className="h-screen bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--fx-grid-vignette)_100%)]" />
        {children}
      </BackgroundStars>
      <Cursor />
    </TransitionProvider>
  );
}

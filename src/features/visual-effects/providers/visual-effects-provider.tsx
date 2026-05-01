import React from "react";

import {
  TransitionProvider,
  useScrollAnimation,
} from "@features/visual-effects";

import { CustomCursor, GridBackground, StarsBackground } from "@shared/ui";

export function VisualEffectsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useScrollAnimation();

  return (
    <TransitionProvider>
      <StarsBackground className="w-full h-auto min-h-dvh">
        <GridBackground className="h-screen bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--fx-grid-vignette)_100%)]" />
        {children}
      </StarsBackground>
      <CustomCursor />
    </TransitionProvider>
  );
}

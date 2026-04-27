import React from "react";

import { CustomCursor, GridBackground, StarsBackground, TransitionProvider } from "@features/visual-effects";
import useScrollAnimation from "@features/visual-effects/hooks/use-scroll-animation";

export function VisualEffectsProvider({ children }: { children: React.ReactNode }) {
  useScrollAnimation();

  return (
    <TransitionProvider>
      <StarsBackground className="w-full h-auto min-h-dvh">
        <GridBackground className="h-screen bg-[radial-gradient(ellipse_at_center,transparent_0%,#09090b_100%)]" />
        {children}
      </StarsBackground>
      <CustomCursor />
    </TransitionProvider>
  );
}

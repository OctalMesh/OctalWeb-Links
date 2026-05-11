import { useContext } from "react";

import { TransitionContext } from "@features/visual-effects";

export function useTransition() {
  const context = useContext(TransitionContext);

  if (!context) {
    throw new Error("useTransition must be used within a TransitionProvider");
  }

  return context;
}

export default useTransition;

import { useContext } from "react";

import {
  TransitionContext,
  type TransitionContextState,
} from "@features/visual-effects";

/**
 * Hook to access the transition screen context.
 *
 * @returns The transition screen {@link TransitionContext context}.
 * @throws {Error} If the hook is used outside the provider.
 */
export function useTransitionScreen(): TransitionContextState {
  const context = useContext(TransitionContext);

  if (!context) {
    throw new Error(
      "useTransitionScreen must be used within TransitionProvider",
    );
  }

  return context;
}

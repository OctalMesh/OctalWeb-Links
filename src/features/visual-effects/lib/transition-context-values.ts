import { createContext } from "react";

export type TransitionContextState = {
  isContentVisible: boolean;
  setContentVisible: (visible: boolean) => void;
};

export const TransitionContext = createContext<TransitionContextState | null>(
  null,
);

export default TransitionContext;

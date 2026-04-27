import { type ReactNode, createContext, use, useState } from "react";

export type TransitionContextState = {
  isContentVisible: boolean;
  setContentVisible: (visible: boolean) => void;
};

export const TransitionContext = createContext<TransitionContextState | null>(null);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [isContentVisible, setContentVisible] = useState(true);

  return <TransitionContext value={{ isContentVisible, setContentVisible }}>{children}</TransitionContext>;
}

export function useTransition() {
  const context = use(TransitionContext);
  if (!context) {
    throw new Error("useTransition must be used within a TransitionProvider");
  }
  return context;
}

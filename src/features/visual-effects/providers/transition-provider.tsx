import { type ReactNode, useState } from "react";

import { TransitionContext } from "@features/visual-effects";

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [isContentVisible, setContentVisible] = useState(true);

  return (
    <TransitionContext.Provider value={{ isContentVisible, setContentVisible }}>
      {children}
    </TransitionContext.Provider>
  );
}

export default TransitionProvider;

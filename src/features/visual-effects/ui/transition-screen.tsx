import * as React from "react";

export function TransitionScreen({ children }: { children?: React.ReactNode }) {
  return <div data-slot="transition-screen">{children}</div>;
}

export default TransitionScreen;

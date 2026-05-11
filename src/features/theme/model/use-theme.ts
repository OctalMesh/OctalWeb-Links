import * as React from "react";

import { ThemeProviderContext } from "./theme-context";

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext);

  if (context === undefined) {
    return {
      theme: "system",
      setTheme: () => {},
    };
  }

  return context;
};

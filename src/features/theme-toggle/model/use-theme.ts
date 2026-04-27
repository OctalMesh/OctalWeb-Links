import * as React from "react";

import { ThemeProviderContext } from "@features/theme-toggle";

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

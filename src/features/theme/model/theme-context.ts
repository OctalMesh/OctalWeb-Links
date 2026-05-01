import * as React from "react";

import type { ThemeProviderState } from "./types";

export const ThemeProviderContext = React.createContext<
  ThemeProviderState | undefined
>(undefined);

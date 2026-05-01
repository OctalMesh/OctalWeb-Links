"use client";

import * as React from "react";

import {
  COLOR_SCHEME_QUERY,
  type Theme,
  ThemeProviderContext,
  type ThemeProviderProps,
  getSystemTheme,
  isTheme,
} from "@features/theme";

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme;

    try {
      const storedTheme = window.localStorage.getItem(storageKey);
      return isTheme(storedTheme) ? storedTheme : defaultTheme;
    } catch {
      return defaultTheme;
    }
  });

  const setTheme = React.useCallback(
    (nextTheme: Theme) => {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(storageKey, nextTheme);
      }
      setThemeState(nextTheme);
    },
    [storageKey],
  );

  const applyTheme = React.useCallback((nextTheme: Theme) => {
    if (typeof window === "undefined") {
      return;
    }

    const root = document.documentElement;
    const resolvedTheme = nextTheme === "system" ? getSystemTheme() : nextTheme;

    root.classList.remove("light", "dark");
    root.classList.add(resolvedTheme);
  }, []);

  React.useEffect(() => {
    applyTheme(theme);

    if (theme !== "system") {
      return undefined;
    }

    const mediaQuery = window.matchMedia(COLOR_SCHEME_QUERY);
    const handleChange = () => applyTheme("system");

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, applyTheme]);

  React.useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const handleStorageChange = (event: StorageEvent) => {
      if (
        event.storageArea !== window.localStorage ||
        event.key !== storageKey
      ) {
        return;
      }

      const newValue = event.newValue;
      if (isTheme(newValue)) {
        setThemeState(newValue);
      } else {
        setThemeState(defaultTheme);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [defaultTheme, storageKey]);

  const value = React.useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

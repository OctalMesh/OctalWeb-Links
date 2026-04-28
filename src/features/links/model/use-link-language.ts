"use client";

import * as React from "react";

import { DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY, type Language, resolvePreferredLanguage } from "@features/i18n";

function readLanguage() {
  if (typeof window === "undefined") {
    return DEFAULT_LANGUAGE;
  }

  const documentLanguage = document.documentElement.lang;
  return resolvePreferredLanguage(window.localStorage.getItem(LANGUAGE_STORAGE_KEY) ?? documentLanguage, [
    documentLanguage,
    ...window.navigator.languages,
  ]);
}

export function useLinkLanguage(): Language {
  const [language, setLanguage] = React.useState<Language>(DEFAULT_LANGUAGE);

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const updateLanguage = () => {
      setLanguage(readLanguage());
    };

    updateLanguage();

    const observer = new MutationObserver(updateLanguage);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });

    const handleStorageChange = (event: StorageEvent) => {
      if (event.storageArea !== window.localStorage || event.key !== LANGUAGE_STORAGE_KEY) {
        return;
      }

      updateLanguage();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return language;
}

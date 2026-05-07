import {
  LANGUAGE_STORAGE_KEY,
  type LanguageListener,
  listeners,
  readStoredLanguage,
} from "./stored-language";

export function subscribeToLanguageChanges(
  listener: LanguageListener,
): () => void {
  listeners.add(listener);

  if (typeof window === "undefined") {
    return () => listeners.delete(listener);
  }

  const handleStorageChange = (event: StorageEvent) => {
    if (
      event.storageArea !== window.localStorage ||
      event.key !== LANGUAGE_STORAGE_KEY
    ) {
      return;
    }

    listener(readStoredLanguage());
  };

  const handleLanguageChange = () => {
    listener(readStoredLanguage());
  };

  window.addEventListener("storage", handleStorageChange);
  window.addEventListener("languagechange", handleLanguageChange);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorageChange);
    window.removeEventListener("languagechange", handleLanguageChange);
  };
}

import { type Language, SUPPORTED_LANGUAGES } from "../config";

export function isLanguage(
  value: string | null | undefined,
): value is Language {
  return !!value && (SUPPORTED_LANGUAGES as string[]).includes(value);
}

import {
  DEFAULT_LANGUAGE,
  type Language,
  SUPPORTED_LANGUAGES,
} from "@shared/i18n/config";
import { LOCALES_BY_LANGUAGE } from "@shared/i18n/locales";

type FlatTranslations = Record<string, string>;

export type InterpolationParams = Record<
  string,
  string | number | boolean | null | undefined
>;

function flatten(
  obj: Record<string, unknown>,
  prefix = "",
): Record<string, string> {
  const out: Record<string, string> = {};

  for (const [key, value] of Object.entries(obj)) {
    const next = prefix ? `${prefix}.${key}` : key;

    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(out, flatten(value as Record<string, unknown>, next));
    } else {
      out[next] = String(value);
    }
  }

  return out;
}

function flattenNamespaces(
  namespaces: Record<string, Record<string, unknown>>,
): FlatTranslations {
  const out: FlatTranslations = {};

  for (const [namespace, payload] of Object.entries(namespaces)) {
    Object.assign(out, flatten(payload, namespace));
  }

  return out;
}

const TRANSLATIONS: Record<string, FlatTranslations> = Object.fromEntries(
  Object.entries(LOCALES_BY_LANGUAGE).map(([language, namespaces]) => [
    language,
    flattenNamespaces(namespaces),
  ]),
);

function resolveLanguage(language: Language): Language {
  if (SUPPORTED_LANGUAGES.includes(language)) {
    return language;
  }

  return DEFAULT_LANGUAGE;
}

function interpolate(template: string, params?: InterpolationParams): string {
  if (!params) {
    return template;
  }

  return template.replace(/\{(\w+)}/g, (_match, key: string) => {
    const value = params[key];

    return value == null ? `{${key}}` : String(value);
  });
}

export function t(
  key: string,
  language: Language,
  params?: InterpolationParams,
): string {
  const resolvedLanguage = resolveLanguage(language);
  const raw =
    TRANSLATIONS[resolvedLanguage]?.[key] ??
    TRANSLATIONS[DEFAULT_LANGUAGE]?.[key] ??
    key;

  return interpolate(raw, params);
}

export { TRANSLATIONS as translations };

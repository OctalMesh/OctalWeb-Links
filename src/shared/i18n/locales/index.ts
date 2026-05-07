type LocaleNamespacePayload = Record<string, unknown>;

type LocaleModuleMap = Record<string, LocaleNamespacePayload>;

type LocalesByLanguage = Record<string, Record<string, LocaleNamespacePayload>>;

const localeModules = import.meta.glob("./*/**/*.json", {
  eager: true,
  import: "default",
}) as LocaleModuleMap;

const LOCALE_PATH_RE = /^\.\/([^/]+)\/([^/]+)\.json$/;

function buildLocalesByLanguage(modules: LocaleModuleMap): LocalesByLanguage {
  const out: LocalesByLanguage = {};

  for (const [path, payload] of Object.entries(modules)) {
    const match = LOCALE_PATH_RE.exec(path);

    if (!match) continue;

    const language = match[1];
    const namespace = match[2];

    if (!language || !namespace) continue;

    if (!out[language]) {
      out[language] = {};
    }

    out[language][namespace] = payload;
  }

  return out;
}

export const LOCALES_BY_LANGUAGE = buildLocalesByLanguage(localeModules);

export const LOCALE_LANGUAGES = Object.keys(LOCALES_BY_LANGUAGE);

export const LOCALE_NAMESPACES = Array.from(
  new Set(
    Object.values(LOCALES_BY_LANGUAGE).flatMap((namespaces) =>
      Object.keys(namespaces),
    ),
  ),
);

export type { LocalesByLanguage, LocaleNamespacePayload };

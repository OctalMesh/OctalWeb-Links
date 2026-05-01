import { i18nData } from "@shared/config";
import { type I18nConfig, I18nConfigSchema } from "@shared/lib/schema";

const parsedConfig = I18nConfigSchema.safeParse(i18nData);

if (!parsedConfig.success) {
  throw new Error(
    `Invalid i18n config: ${JSON.stringify(parsedConfig.error.issues, null, 2)}`,
  );
}

const i18nConfig: I18nConfig = parsedConfig.data;

export function getI18nConfig(): I18nConfig {
  return i18nConfig;
}

import i18nData from "@shared/data/i18n.json";
import { type I18nConfig, I18nConfigSchema } from "@shared/lib/schema/i18n";

const parsedConfig = I18nConfigSchema.safeParse(i18nData);

if (!parsedConfig.success) {
  throw new Error(`Invalid i18n config: ${JSON.stringify(parsedConfig.error.issues, null, 2)}`);
}

export const i18nConfig: I18nConfig = parsedConfig.data;

export function getI18nConfig(): I18nConfig {
  return i18nConfig;
}

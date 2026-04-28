import { z } from "zod";

export const LanguageOptionSchema = z.object({
  code: z.string().min(1),
  label: z.string().min(1),
});

export const I18nConfigSchema = z.object({
  defaultLanguage: z.string().min(1),
  languages: z.array(LanguageOptionSchema).min(1),
  translations: z.record(z.string(), z.record(z.string(), z.string())),
});

export type LanguageOption = z.infer<typeof LanguageOptionSchema>;
export type I18nConfig = z.infer<typeof I18nConfigSchema>;

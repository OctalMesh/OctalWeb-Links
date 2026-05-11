import { z } from "zod";

export const LocalizedTextSchema = z.record(z.string(), z.string());

export const LinkItemSchema = z.object({
  id: z.string(),
  icon: z.string(),
  categoryId: z.string(),
  href: z.url(),
  title: LocalizedTextSchema,
  description: LocalizedTextSchema.optional(),
  disabled: z.boolean().default(false),
  priority: z.number().default(0),
});

export const LinkCategorySchema = z.object({
  id: z.string(),
  title: LocalizedTextSchema,
  subtitle: LocalizedTextSchema,
});

export const ProjectConfigSchema = z.object({
  categories: z.array(LinkCategorySchema),
  links: z.array(LinkItemSchema),
});

export type LocalizedText = z.infer<typeof LocalizedTextSchema>;
export type LinkItem = z.infer<typeof LinkItemSchema>;
export type LinkCategory = z.infer<typeof LinkCategorySchema>;
export type ProjectConfig = z.infer<typeof ProjectConfigSchema>;

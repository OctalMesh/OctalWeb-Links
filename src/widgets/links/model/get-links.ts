import { linksData } from "@shared/config";
import { type ProjectConfig, ProjectConfigSchema } from "@shared/lib/schema";

const parsedConfig = ProjectConfigSchema.safeParse(linksData);

if (!parsedConfig.success) {
  throw new Error(
    `Invalid links config: ${JSON.stringify(parsedConfig.error.issues, null, 2)}`,
  );
}

export const projectConfig: ProjectConfig = parsedConfig.data;

export function getLinksConfig(): ProjectConfig {
  return projectConfig;
}

export function getLinkById(linkId: string) {
  return projectConfig.links.find((link) => link.id === linkId);
}

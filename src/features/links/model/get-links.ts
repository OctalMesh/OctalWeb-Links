import linksConfig from "@shared/data/links.json";
import { type ProjectConfig, ProjectConfigSchema } from "@shared/lib/schema/links";

const parsedConfig = ProjectConfigSchema.safeParse(linksConfig);

if (!parsedConfig.success) {
  throw new Error(`Invalid links config: ${JSON.stringify(parsedConfig.error.issues, null, 2)}`);
}

export const projectConfig: ProjectConfig = parsedConfig.data;

export function getLinksConfig(): ProjectConfig {
  return projectConfig;
}

export function getLinkById(linkId: string) {
  return projectConfig.links.find((link) => link.id === linkId);
}

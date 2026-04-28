import { type ReactElement } from "react";

import { Icon, type IconId } from "@shared/ui/icons";

const iconMap = {
  discord: true,
  github: true,
  instagram: true,
  linkedin: true,
  mail: true,
  moon: true,
  patreon: true,
  reddit: true,
  sun: true,
  telegram: true,
  tiktok: true,
  twitch: true,
  x: true,
  youtube: true,
} as const satisfies Record<IconId, true>;

export function resolveIcon(icon: string, size = 40): ReactElement | null {
  if (!(icon in iconMap)) {
    return null;
  }

  return <Icon id={icon as IconId} size={size} />;
}

export { iconMap };

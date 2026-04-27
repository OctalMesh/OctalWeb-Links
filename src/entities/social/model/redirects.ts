import type { RedirectLink } from "./types";

export const redirects: Record<string, RedirectLink> = {
  email: {
    href: "mailto:contact@octalmesh.com",
    title: "Email",
    description: "Contact directly via email.",
  },
  github: {
    href: "https://git.octalmesh.com",
    title: "GitHub",
    description: "Visit GitHub organization.",
  },
  telegram: {
    href: "https://t.me/octalmesh",
    title: "Telegram",
    description: "Visit Telegram channel.",
  },
  manager: {
    href: "https://t.me/octalmesh_manager",
    title: "Manager",
    description: "Contact manager.",
  },
  telegram_manager: {
    href: "https://t.me/octalmesh_manager",
    title: "Telegram Manager",
    description: "Contact manager via Telegram.",
  },
  youtube: {
    href: "https://youtube.com/@octalmesh",
    title: "YouTube",
    description: "Visit YouTube channel.",
  },
  twitch: {
    href: "https://twitch.tv/octalmesh",
    title: "Twitch",
    description: "Visit Twitch channel.",
  },
  instagram: {
    href: "https://instagram.com/octalmesh",
    title: "Instagram",
    description: "Visit Instagram profile.",
  },
  tiktok: {
    href: "https://tiktok.com/@octalmesh",
    title: "TikTok",
    description: "Visit TikTok profile.",
  },
  x: {
    href: "https://x.com/octalmesh",
    title: "X",
    description: "Visit X profile.",
  },
  reddit: {
    href: "https://reddit.com/r/octalmesh/",
    title: "Reddit",
    description: "Visit Reddit community.",
  },
  linkedin: {
    href: "https://linkedin.com/company/octalmesh",
    title: "LinkedIn",
    description: "Visit LinkedIn community.",
  },
  patreon: {
    href: "https://patreon.com/c/octalmesh",
    title: "Patreon",
    description: "Support on Patreon.",
  },
};

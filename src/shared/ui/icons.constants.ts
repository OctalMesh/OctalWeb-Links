import { type ComponentType } from "react";

import {
  DiscordIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  PatreonIcon,
  RedditIcon,
  TelegramIcon,
  TikTokIcon,
  TwitchIcon,
  XIcon,
  YouTubeIcon,
} from "./icons";
import type { IconId, IconProps } from "./icons";

export const iconMap = new Map<IconId, ComponentType<IconProps>>([
  ["mail", MailIcon],
  ["github", GitHubIcon],
  ["telegram", TelegramIcon],
  ["youtube", YouTubeIcon],
  ["twitch", TwitchIcon],
  ["instagram", InstagramIcon],
  ["tiktok", TikTokIcon],
  ["x", XIcon],
  ["reddit", RedditIcon],
  ["linkedin", LinkedInIcon],
  ["patreon", PatreonIcon],
  ["discord", DiscordIcon],
]);

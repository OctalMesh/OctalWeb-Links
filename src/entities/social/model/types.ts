export type SocialIconId =
  | "mail"
  | "linkedin"
  | "github"
  | "telegram"
  | "youtube"
  | "twitch"
  | "instagram"
  | "tiktok"
  | "x"
  | "reddit"
  | "patreon";

export type SocialCategoryId = string;

export type RedirectLink = {
  href: string;
  title: string;
  description: string;
};

export type SocialCard = {
  title: string;
  icon: SocialIconId;
  linkKey: string;
  category?: string;
  disabled?: boolean;
};

export type SocialCategory = {
  id: string;
  title: string;
  subtitle: string;
};

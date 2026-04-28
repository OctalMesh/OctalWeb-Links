import { type ImgHTMLAttributes, type ReactElement } from "react";

import clsx from "clsx";

import { type SocialCategoryId, type SocialIconId, redirects } from "@entities/social";

import styles from "@shared/styles/scroll-animated.module.css";
import { Icon } from "@shared/ui/icons.tsx";

export type LinkCardProps = {
  title: string;
  icon: SocialIconId;
  linkKey: string;
  category?: SocialCategoryId;
  disabled?: boolean;
  background?: ImgHTMLAttributes<HTMLImageElement>;
  iconSize?: number;
};

export function LinkCard({ properties }: { properties: LinkCardProps }): ReactElement | null {
  if (properties.disabled) {
    return null;
  }

  const redirect = redirects[properties.linkKey];

  if (!redirect) {
    return null;
  }

  return (
    <a
      className={clsx(
        styles.scrollAnimated,
        "relative inline-flex items-center tap-highlight-transparent",
        "text-primary no-underline",
        "flex-1 min-w-full sm:min-w-[18rem] md:min-w-88",
        "transition-all duration-300",
      )}
      href={redirect.href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <div
        className={clsx([
          "w-full h-full min-h-24 sm:min-h-64",
          "flex flex-col justify-center items-center",
          "rounded-[2.5rem] border",
          "backdrop-blur-sm bg-(--fx-card-bg) border-(--fx-card-border)",
          "hover:bg-(--fx-card-bg-hover) hover:border-(--fx-card-border-hover)",
          "hover:scale-[1.01]",
          "transition-all duration-500",
        ])}
      >
        {properties.icon ? (
          <div
            className={clsx([
              "z-10 flex items-center justify-center",
              "px-6 sm:px-0",
              "max-sm:absolute max-sm:left-6 max-sm:top-1/2 max-sm:-translate-y-1/2",
            ])}
          >
            <div className="opacity-80 group-hover:opacity-100 transition-opacity">
              <Icon id={properties.icon} size={properties.iconSize || 40} />
            </div>
          </div>
        ) : null}

        {properties.title ? (
          <h3
            className={clsx(
              "z-10 text-sm font-light font-mono tracking-[0.2em]",
              "transition-colors",
              "sm:absolute sm:bottom-6 sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:text-center",
              "max-sm:ml-20 max-sm:content-center",
            )}
            style={{ color: "var(--fx-card-text)" }}
          >
            {properties.title}
          </h3>
        ) : null}
      </div>
    </a>
  );
}

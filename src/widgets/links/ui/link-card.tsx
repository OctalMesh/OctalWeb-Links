import { type ReactElement } from "react";

import {
  type LinkCardProps,
  getContent,
  useLinkLanguage,
} from "@widgets/links";
import { LinkDialog } from "@widgets/links/ui/link-dialog";

import { cn } from "@shared/lib";
import { resolveIcon } from "@shared/ui/icon";

export function LinkCard({
  properties,
}: {
  properties: LinkCardProps;
}): ReactElement | null {
  const language = useLinkLanguage();

  if (properties.disabled) {
    return null;
  }

  const title = getContent(properties.title, language);
  const description = getContent(properties.description, language);
  const ariaLabel = description ? `${title}. ${description}` : title;

  return (
    <li
      className={cn(
        "scrollAnimated",
        "flex-1 min-w-full sm:min-w-[18rem] md:min-w-88",
        "list-none relative group",
      )}
    >
      <a
        aria-label={ariaLabel}
        className={cn(
          "group relative inline-flex items-center tap-highlight-transparent",
          "text-primary no-underline w-full h-full",
          "transition-all duration-300",
        )}
        href={properties.href}
        rel="noopener noreferrer"
        target="_blank"
      >
        <div
          className={cn([
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
              className={cn([
                "z-10 flex items-center justify-center",
                "px-6 sm:px-0",
                "max-sm:absolute max-sm:left-2.5 max-sm:top-1/2 max-sm:-translate-y-1/2",
              ])}
            >
              <div className="opacity-80 group-hover:opacity-100 transition-opacity">
                {resolveIcon(properties.icon, 40)}
              </div>
            </div>
          ) : null}

          <h3
            className={cn(
              "z-10 text-sm text-fx-card-text font-light font-mono tracking-[0.2em]",
              "transition-colors",
              "sm:absolute sm:bottom-6 sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:text-center",
              "max-sm:content-center",
            )}
          >
            {title}
          </h3>
        </div>
      </a>

      <div
        className={cn([
          "z-20 flex items-center justify-center",
          "px-6 sm:px-0",
          "sm:absolute sm:top-6 sm:right-6",
          "max-sm:absolute max-sm:right-0 max-sm:top-1/2 max-sm:-translate-y-1/2",
          "transition-opacity duration-500",

          /* For devices with cursor */
          "[@media(hover:hover)]:opacity-0 [@media(hover:hover)]:pointer-events-none",
          "[@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:pointer-events-auto",

          /* For devices without cursor (e.g., touchscreens) */
          "[@media(hover:none)]:opacity-100 [@media(hover:none)]:pointer-events-auto",
        ])}
      >
        <LinkDialog properties={properties} />
      </div>
    </li>
  );
}

import type { ReactElement } from "react";
import * as React from "react";

import {
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandMessenger,
  IconBrandWhatsapp,
  IconBrandX,
  IconCheck,
  IconDotsVertical,
  IconLink,
  IconShare,
} from "@tabler/icons-react";

import { type LinkCardProps } from "@widgets/links";
import { useLinkLanguage } from "@widgets/links";
import { resolveIcon } from "@widgets/links";

import { getTranslation } from "@features/i18n";

import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui/dialog";
import { IconButton } from "@shared/ui/icon-button";
import {
  PreviewLinkCard,
  PreviewLinkCardImage,
} from "@shared/ui/preview-link-card";
import { ScrollArea, ScrollBar } from "@shared/ui/scroll";

export function LinkDialog({
  properties,
}: {
  properties: LinkCardProps;
}): ReactElement | null {
  const language = useLinkLanguage();
  const t = React.useCallback(
    (k: string) => getTranslation(k, language),
    [language],
  );

  const [copied, setCopied] = React.useState(false);

  const altText =
    typeof properties.title === "string"
      ? properties.title
      : (Object.values(properties.title ?? {})[0] ?? "Preview");

  const onCopy = React.useCallback(async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(properties.href);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
        return;
      }
    } catch {
      // fallthrough to execCommand fallback
    }

    try {
      const ta = document.createElement("textarea");
      ta.value = properties.href;

      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      if (ok) {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // ignore
    }
  }, [properties.href]);

  const open = React.useCallback((url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  const onNativeShare = React.useCallback(async () => {
    const share =
      typeof navigator !== "undefined" && typeof navigator.share === "function"
        ? navigator.share.bind(navigator)
        : undefined;

    if (share) {
      try {
        await share({ url: properties.href });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }

      try {
        await share({
          title: altText,
          text: properties.href,
          url: properties.href,
        });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }
    }

    // Fallback to copy only when native sharing is unavailable or failed.
    await onCopy();
  }, [altText, onCopy, properties.href]);

  const onNativeSharePointerDown = React.useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      if (event.pointerType !== "touch") {
        return;
      }

      event.preventDefault();
      void onNativeShare();
    },
    [onNativeShare],
  );

  const shareItems = [
    {
      key: "copy",
      icon: IconLink,
      label: "share.copy",
      onClick: onCopy,
    },
    {
      key: "x",
      icon: IconBrandX,
      label: "share.x",
      onClick: () =>
        open(
          `https://x.com/intent/tweet?url=${encodeURIComponent(properties.href)}`,
        ),
    },
    {
      key: "facebook",
      icon: IconBrandFacebook,
      label: "share.facebook",
      onClick: () =>
        open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(properties.href)}`,
        ),
    },
    {
      key: "whatsapp",
      icon: IconBrandWhatsapp,
      label: "share.whatsapp",
      onClick: () =>
        open(
          `https://api.whatsapp.com/send?text=${encodeURIComponent(properties.href)}`,
        ),
    },
    {
      key: "linkedin",
      icon: IconBrandLinkedin,
      label: "share.linkedin",
      onClick: () =>
        open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(properties.href)}`,
        ),
    },
    {
      key: "messenger",
      icon: IconBrandMessenger,
      label: "share.messenger",
      onClick: () =>
        open(
          `https://www.messenger.com/share?link=${encodeURIComponent(properties.href)}`,
        ),
    },
    {
      key: "more",
      icon: IconShare,
      label: "share.more",
      onClick: onNativeShare,
      onPointerDown: onNativeSharePointerDown,
    },
  ];

  return (
    <Dialog>
      <DialogTrigger
        render={
          <IconButton variant={"outline"} size={"xl"} className="bg-input/25">
            <IconDotsVertical />
          </IconButton>
        }
      />

      <DialogPopup>
        <DialogHeader>
          <DialogTitle className="text-center">{t("share.title")}</DialogTitle>
        </DialogHeader>

        <div className="pt-2 grid gap-4">
          <PreviewLinkCard href={properties.href}>
            <PreviewLinkCardImage
              className="w-full"
              alt={altText}
              fallbackIcon={
                properties.icon ? resolveIcon(properties.icon, 48) : undefined
              }
            />
          </PreviewLinkCard>
        </div>

        <DialogFooter
          className="sm:justify-start px-0! overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          }}
        >
          <ScrollArea withArrows className="w-full whitespace-nowrap">
            <div className="flex w-full min-w-max justify-between space-x-3 py-2 px-3">
              {shareItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.key} className="flex-none">
                    <IconButton
                      type="button"
                      onClick={item.onClick}
                      onPointerDown={item.onPointerDown}
                      aria-label={t(item.label)}
                      variant="outline"
                      className="size-15 rounded-3xl [&_svg:not([class*='size-'])]:size-6"
                    >
                      {item.key === "copy" && copied ? <IconCheck /> : <Icon />}
                    </IconButton>
                  </div>
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}

"use client";

import type { ReactElement } from "react";
import * as React from "react";

import {
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandMessenger,
  IconBrandReddit,
  IconBrandTelegram,
  IconBrandThreads,
  IconBrandWhatsapp,
  IconBrandX,
  IconCheck,
  IconDotsVertical,
  IconLink,
  IconMail,
  IconMessageCircle,
  IconShare,
} from "@tabler/icons-react";

import { type LinkCardProps } from "@widgets/links";

import { useT } from "@features/i18n";

import { IconButton } from "@shared/ui/button";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui/dialog";
import { resolveIcon } from "@shared/ui/icon";
import { PreviewLinkCard, PreviewLinkCardImage } from "@shared/ui/preview";
import { ScrollArea, ScrollBar } from "@shared/ui/scroll";

export function LinkDialog({
  properties,
}: {
  properties: LinkCardProps;
}): ReactElement | null {
  const t = useT();

  const [copied, setCopied] = React.useState(false);
  const ignoreNextShareClickRef = React.useRef(false);

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
      ignoreNextShareClickRef.current = true;
      void onNativeShare();
    },
    [onNativeShare],
  );

  const onNativeShareClick = React.useCallback(() => {
    if (ignoreNextShareClickRef.current) {
      ignoreNextShareClickRef.current = false;
      return;
    }

    void onNativeShare();
  }, [onNativeShare]);

  const shareItems = [
    {
      key: "telegram",
      icon: IconBrandTelegram,
      label: "common.share.telegram",
      onClick: () =>
        open(
          `https://t.me/share/url?url=${encodeURIComponent(properties.href)}&text=${encodeURIComponent(altText)}`,
        ),
    },
    {
      key: "viber",
      icon: IconMessageCircle,
      label: "common.share.viber",
      onClick: () =>
        open(
          `viber://forward?text=${encodeURIComponent(`${altText} ${properties.href}`)}`,
        ),
    },
    {
      key: "whatsapp",
      icon: IconBrandWhatsapp,
      label: "common.share.whatsapp",
      onClick: () =>
        open(
          `https://api.whatsapp.com/send?text=${encodeURIComponent(properties.href)}`,
        ),
    },
    {
      key: "messenger",
      icon: IconBrandMessenger,
      label: "common.share.messenger",
      onClick: () =>
        open(
          `https://www.messenger.com/share?link=${encodeURIComponent(properties.href)}`,
        ),
    },
    {
      key: "x",
      icon: IconBrandX,
      label: "common.share.x",
      onClick: () =>
        open(
          `https://x.com/intent/tweet?url=${encodeURIComponent(properties.href)}`,
        ),
    },
    {
      key: "threads",
      icon: IconBrandThreads,
      label: "common.share.threads",
      onClick: () =>
        open(
          `https://www.threads.net/intent/post?text=${encodeURIComponent(`${altText} ${properties.href}`)}`,
        ),
    },
    {
      key: "reddit",
      icon: IconBrandReddit,
      label: "common.share.reddit",
      onClick: () =>
        open(
          `https://www.reddit.com/submit?url=${encodeURIComponent(properties.href)}&title=${encodeURIComponent(altText)}`,
        ),
    },
    {
      key: "facebook",
      icon: IconBrandFacebook,
      label: "common.share.facebook",
      onClick: () =>
        open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(properties.href)}`,
        ),
    },
    {
      key: "linkedin",
      icon: IconBrandLinkedin,
      label: "common.share.linkedin",
      onClick: () =>
        open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(properties.href)}`,
        ),
    },
    {
      key: "email",
      icon: IconMail,
      label: "common.share.email",
      onClick: () =>
        open(
          `mailto:?subject=${encodeURIComponent(altText)}&body=${encodeURIComponent(properties.href)}`,
        ),
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
          <DialogTitle className="text-center">
            {t("common.share.title")}
          </DialogTitle>
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

        <div
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
                      aria-label={t(item.label)}
                      variant="outline"
                      className="size-15 rounded-3xl [&_svg:not([class*='size-'])]:size-6"
                    >
                      <Icon />
                    </IconButton>
                  </div>
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        <DialogFooter className="">
          <div className="grid grid-cols-2 gap-3 pb-3">
            <IconButton
              type="button"
              onClick={onCopy}
              aria-label={t("common.share.copy")}
              variant="outline"
              size={"xxl"}
              className="z-1000 w-full rounded-3xl px-4 py-4 justify-center gap-2 text-sm"
            >
              {copied ? <IconCheck /> : <IconLink />}
              <span>{t("common.share.copy")}</span>
            </IconButton>
            <IconButton
              type="button"
              onClick={onNativeShareClick}
              onPointerDown={onNativeSharePointerDown}
              aria-label={t("common.share.more")}
              variant="outline"
              size={"xxl"}
              className="w-full rounded-3xl px-4 py-4 justify-center gap-2 text-sm"
            >
              <IconShare />
              <span>{t("common.share.more")}</span>
            </IconButton>
          </div>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}

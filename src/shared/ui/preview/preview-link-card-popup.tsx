"use client";

import * as React from "react";

import {
  PreviewCardPopup,
  type PreviewCardPopupProps,
} from "./preview-card-popup";
import { usePreviewLinkCard } from "./preview-link-card.context";

export type PreviewLinkCardPopupProps = PreviewCardPopupProps &
  React.ComponentProps<"a">;

export function PreviewLinkCardPopup({
  transition = { type: "spring", stiffness: 300, damping: 25 },
  href: hrefProp,
  style,
  children,
  ...props
}: PreviewLinkCardPopupProps) {
  const { href } = usePreviewLinkCard();

  return (
    <PreviewCardPopup
      data-slot="preview-link-card-popup"
      transition={transition}
    >
      <a
        data-slot="preview-link-card-popup-link"
        style={{
          display: "block",
          ...style,
        }}
        href={hrefProp ?? href}
        {...props}
      >
        {children}
      </a>
    </PreviewCardPopup>
  );
}

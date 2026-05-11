"use client";

import * as React from "react";

import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
import { AnimatePresence } from "motion/react";

import { usePreviewCard } from "./preview-card.context";

export type PreviewCardPortalProps = Omit<
  React.ComponentProps<typeof PreviewCardPrimitive.Portal>,
  "keepMounted"
>;

export function PreviewCardPortal(props: PreviewCardPortalProps) {
  const { isOpen } = usePreviewCard();

  return (
    <AnimatePresence>
      {isOpen && (
        <PreviewCardPrimitive.Portal
          keepMounted
          data-slot="preview-card-portal"
          {...props}
        />
      )}
    </AnimatePresence>
  );
}

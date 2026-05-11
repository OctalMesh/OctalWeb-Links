"use client";

import * as React from "react";

import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";

import { usePreviewCard } from "./preview-card.context";

export type PreviewCardTriggerProps = React.ComponentProps<
  typeof PreviewCardPrimitive.Trigger
>;

export function PreviewCardTrigger({
  onMouseMove,
  ...props
}: PreviewCardTriggerProps) {
  const { x, y, followCursor } = usePreviewCard();

  const handleMouseMove = (
    event: Parameters<NonNullable<PreviewCardTriggerProps["onMouseMove"]>>[0],
  ) => {
    onMouseMove?.(event);

    const target = event.currentTarget.getBoundingClientRect();

    if (followCursor === "x" || followCursor === true) {
      const eventOffsetX = event.clientX - target.left;
      const offsetXFromCenter = (eventOffsetX - target.width / 2) / 2;
      x.set(offsetXFromCenter);
    }

    if (followCursor === "y" || followCursor === true) {
      const eventOffsetY = event.clientY - target.top;
      const offsetYFromCenter = (eventOffsetY - target.height / 2) / 2;
      y.set(offsetYFromCenter);
    }
  };

  return (
    <PreviewCardPrimitive.Trigger
      data-slot="preview-card-trigger"
      onMouseMove={handleMouseMove}
      {...props}
    />
  );
}

"use client";

import * as React from "react";

import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";

export type PreviewCardBackdropProps = React.ComponentProps<
  typeof PreviewCardPrimitive.Backdrop
>;

export function PreviewCardBackdrop(props: PreviewCardBackdropProps) {
  return (
    <PreviewCardPrimitive.Backdrop
      data-slot="preview-card-backdrop"
      {...props}
    />
  );
}

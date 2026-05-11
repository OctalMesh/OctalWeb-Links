"use client";

import * as React from "react";

import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";

export type PreviewCardArrowProps = React.ComponentProps<
  typeof PreviewCardPrimitive.Arrow
>;

export function PreviewCardArrow(props: PreviewCardArrowProps) {
  return (
    <PreviewCardPrimitive.Arrow data-slot="preview-card-arrow" {...props} />
  );
}

"use client";

import * as React from "react";

import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";

export type PreviewCardPositionerProps = React.ComponentProps<
  typeof PreviewCardPrimitive.Positioner
>;

export function PreviewCardPositioner(props: PreviewCardPositionerProps) {
  return (
    <PreviewCardPrimitive.Positioner
      data-slot="preview-card-positioner"
      {...props}
    />
  );
}

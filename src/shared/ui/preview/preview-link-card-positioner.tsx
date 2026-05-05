"use client";

import {
  PreviewCardPositioner,
  type PreviewCardPositionerProps,
} from "./preview-card-positioner";

export type PreviewLinkCardPositionerProps = PreviewCardPositionerProps;

export function PreviewLinkCardPositioner({
  side = "top",
  sideOffset = 10,
  align = "center",
  ...props
}: PreviewLinkCardPositionerProps) {
  return (
    <PreviewCardPositioner
      data-slot="preview-link-card-positioner"
      side={side}
      sideOffset={sideOffset}
      align={align}
      {...props}
    />
  );
}

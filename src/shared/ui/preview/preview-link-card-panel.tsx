import * as React from "react";

import { cn } from "@shared/lib/utils";

import type { PreviewCardPopupProps } from "./preview-card-popup";
import type { PreviewCardPositionerProps } from "./preview-card-positioner";
import { PreviewLinkCardPopup } from "./preview-link-card-popup";
import { PreviewLinkCardPortal } from "./preview-link-card-portal";
import { PreviewLinkCardPositioner } from "./preview-link-card-positioner";

export type PreviewLinkCardPanelProps = PreviewCardPositionerProps &
  PreviewCardPopupProps &
  React.ComponentProps<"a">;

export function PreviewLinkCardPanel({
  className,
  align = "center",
  sideOffset = 4,
  style,
  children,
  ...props
}: PreviewLinkCardPanelProps) {
  return (
    <PreviewLinkCardPortal>
      <PreviewLinkCardPositioner
        align={align}
        sideOffset={sideOffset}
        className="z-50"
        {...props}
      >
        <PreviewLinkCardPopup
          className={cn(
            "origin-(--transform-origin) overflow-hidden rounded-md shadow-md outline-hidden",
            className,
          )}
          style={style}
        >
          {children}
        </PreviewLinkCardPopup>
      </PreviewLinkCardPositioner>
    </PreviewLinkCardPortal>
  );
}

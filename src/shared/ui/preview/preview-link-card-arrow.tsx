"use client";

import {
  PreviewCardArrow,
  type PreviewCardArrowProps,
} from "./preview-card-arrow";

export type PreviewLinkCardArrowProps = PreviewCardArrowProps;

export function PreviewLinkCardArrow(props: PreviewLinkCardArrowProps) {
  return <PreviewCardArrow data-slot="preview-link-card-arrow" {...props} />;
}

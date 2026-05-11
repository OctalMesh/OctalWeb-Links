"use client";

import {
  PreviewCardPortal,
  type PreviewCardPortalProps,
} from "./preview-card-portal";

export type PreviewLinkCardPortalProps = PreviewCardPortalProps;

export function PreviewLinkCardPortal(props: PreviewLinkCardPortalProps) {
  return <PreviewCardPortal data-slot="preview-link-card-portal" {...props} />;
}

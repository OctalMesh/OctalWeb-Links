import * as React from "react";

import { PreviewCardTrigger, type PreviewCardTriggerProps } from "@shared/ui";

import { usePreviewLinkCard } from "./preview-link-card.context";

export type PreviewLinkCardTriggerProps = PreviewCardTriggerProps &
  React.ComponentProps<"a">;

export function PreviewLinkCardTrigger({
  children,
  href: hrefProp,
  render,
  ...props
}: PreviewLinkCardTriggerProps) {
  const { href } = usePreviewLinkCard();

  return (
    <PreviewCardTrigger
      data-slot="preview-link-card-trigger"
      render={render ?? <a href={hrefProp ?? href}>{children}</a>}
      {...props}
    />
  );
}

import { PreviewCardBackdrop, type PreviewCardBackdropProps } from "@shared/ui";

export type PreviewLinkCardBackdropProps = PreviewCardBackdropProps;

export function PreviewLinkCardBackdrop(props: PreviewLinkCardBackdropProps) {
  return (
    <PreviewCardBackdrop data-slot="preview-link-card-backdrop" {...props} />
  );
}

import { cn } from "@shared/lib/utils";
import {
  PreviewLinkCardBackdrop as PreviewLinkCardBackdropPrimitive,
  type PreviewLinkCardBackdropProps as PreviewLinkCardBackdropPrimitiveProps,
  PreviewLinkCardImage as PreviewLinkCardImagePrimitive,
  type PreviewLinkCardImageProps as PreviewLinkCardImagePrimitiveProps,
  PreviewLinkCardPopup as PreviewLinkCardPopupPrimitive,
  type PreviewLinkCardPopupProps as PreviewLinkCardPopupPrimitiveProps,
  PreviewLinkCardPortal as PreviewLinkCardPortalPrimitive,
  PreviewLinkCardPositioner as PreviewLinkCardPositionerPrimitive,
  type PreviewLinkCardPositionerProps as PreviewLinkCardPositionerPrimitiveProps,
  PreviewLinkCard as PreviewLinkCardPrimitive,
  type PreviewLinkCardProps as PreviewLinkCardPrimitiveProps,
  PreviewLinkCardTrigger as PreviewLinkCardTriggerPrimitive,
  type PreviewLinkCardTriggerProps as PreviewLinkCardTriggerPrimitiveProps,
} from "@shared/ui/primitives/preview-link-card";

type PreviewLinkCardProps = PreviewLinkCardPrimitiveProps;

function PreviewLinkCard(props: PreviewLinkCardProps) {
  return <PreviewLinkCardPrimitive {...props} />;
}

type PreviewLinkCardTriggerProps = PreviewLinkCardTriggerPrimitiveProps;

function PreviewLinkCardTrigger(props: PreviewLinkCardTriggerProps) {
  return <PreviewLinkCardTriggerPrimitive {...props} />;
}

type PreviewLinkCardPanelProps = PreviewLinkCardPositionerPrimitiveProps & PreviewLinkCardPopupPrimitiveProps;

function PreviewLinkCardPanel({
  className,
  align = "center",
  sideOffset = 4,
  style,
  children,
  ...props
}: PreviewLinkCardPanelProps) {
  return (
    <PreviewLinkCardPortalPrimitive>
      <PreviewLinkCardPositionerPrimitive align={align} sideOffset={sideOffset} className="z-50" {...props}>
        <PreviewLinkCardPopupPrimitive
          className={cn("origin-(--transform-origin) overflow-hidden rounded-md shadow-md outline-hidden", className)}
          style={style}
        >
          {children}
        </PreviewLinkCardPopupPrimitive>
      </PreviewLinkCardPositionerPrimitive>
    </PreviewLinkCardPortalPrimitive>
  );
}

type PreviewLinkCardBackdropProps = PreviewLinkCardBackdropPrimitiveProps;

function PreviewLinkCardBackdrop(props: PreviewLinkCardBackdropProps) {
  return <PreviewLinkCardBackdropPrimitive {...props} />;
}

type PreviewLinkCardImageProps = PreviewLinkCardImagePrimitiveProps;

function PreviewLinkCardImage(props: PreviewLinkCardImageProps) {
  return <PreviewLinkCardImagePrimitive {...props} />;
}

export {
  PreviewLinkCard,
  PreviewLinkCardTrigger,
  PreviewLinkCardPanel,
  PreviewLinkCardBackdrop,
  PreviewLinkCardImage,
  type PreviewLinkCardProps,
  type PreviewLinkCardTriggerProps,
  type PreviewLinkCardPanelProps,
  type PreviewLinkCardBackdropProps,
  type PreviewLinkCardImageProps,
};

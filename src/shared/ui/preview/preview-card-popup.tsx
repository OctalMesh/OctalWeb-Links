import type { ComponentProps } from "react";

import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
import { type HTMLMotionProps, motion, useSpring } from "motion/react";

import { usePreviewCard } from "./preview-card.context";

export type PreviewCardPopupProps = Omit<
  ComponentProps<typeof PreviewCardPrimitive.Popup>,
  "render"
> &
  HTMLMotionProps<"div">;

export function PreviewCardPopup({
  transition = { type: "spring", stiffness: 300, damping: 25 },
  style,
  ...props
}: PreviewCardPopupProps) {
  const { x, y, followCursor, followCursorSpringOptions } = usePreviewCard();
  const translateX = useSpring(x, followCursorSpringOptions);
  const translateY = useSpring(y, followCursorSpringOptions);

  return (
    <PreviewCardPrimitive.Popup
      render={
        <motion.div
          key="preview-card-popup"
          data-slot="preview-card-popup"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={transition}
          style={{
            x:
              followCursor === "x" || followCursor === true
                ? translateX
                : undefined,
            y:
              followCursor === "y" || followCursor === true
                ? translateY
                : undefined,
            ...style,
          }}
          {...props}
        />
      }
    />
  );
}

import * as React from "react";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { IconX } from "@tabler/icons-react";
import { type HTMLMotionProps, motion } from "motion/react";

import { cn } from "@shared/lib";

import { IconButton } from "../button/icon-button";
import { DialogBackdrop } from "./dialog-backdrop";
import { DialogClose } from "./dialog-close";
import { DialogPortal } from "./dialog-portal";

export type DialogFlipDirection = "top" | "bottom" | "left" | "right";

export type DialogPopupProps = Omit<
  React.ComponentProps<typeof DialogPrimitive.Popup>,
  "render"
> &
  HTMLMotionProps<"div"> & {
    from?: DialogFlipDirection;
    showCloseButton?: boolean;
  };

export function DialogPopup({
  from = "top",
  initialFocus,
  finalFocus,
  transition = { type: "spring", stiffness: 150, damping: 25 },
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogPopupProps) {
  const initialRotation =
    from === "bottom" || from === "left" ? "20deg" : "-20deg";
  const isVertical = from === "top" || from === "bottom";
  const rotateAxis = isVertical ? "rotateX" : "rotateY";

  return (
    <DialogPortal>
      <DialogBackdrop />
      <DialogPrimitive.Popup
        className={cn([
          "fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 p-4 pt-6 shadow-lg sm:max-w-lg",
          "rounded-lg border",
          "backdrop-blur-lg bg-fx-dialog-bg border-fx-dialog-border",
          className,
        ])}
        initialFocus={initialFocus}
        finalFocus={finalFocus}
        render={
          <motion.div
            key="dialog-popup"
            data-slot="dialog-popup"
            initial={{
              opacity: 0,
              filter: "blur(4px)",
              transform: `perspective(500px) ${rotateAxis}(${initialRotation}) scale(0.8)`,
            }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
              transform: `perspective(500px) ${rotateAxis}(0deg) scale(1)`,
            }}
            exit={{
              opacity: 0,
              filter: "blur(4px)",
              transform: `perspective(500px) ${rotateAxis}(${initialRotation}) scale(0.8)`,
            }}
            transition={transition}
            {...props}
          />
        }
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogClose className="ring-offset-background focus:ring-ring data-open:bg-accent data-open:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
            <IconButton variant={"outline"}>
              <IconX />
            </IconButton>
            <span className="sr-only">Close</span>
          </DialogClose>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  );
}

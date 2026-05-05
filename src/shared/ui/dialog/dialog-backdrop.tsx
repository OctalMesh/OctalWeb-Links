import * as React from "react";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { type HTMLMotionProps, motion } from "motion/react";

import { cn } from "@shared/lib";

export type DialogBackdropProps = Omit<
  React.ComponentProps<typeof DialogPrimitive.Backdrop>,
  "render"
> &
  HTMLMotionProps<"div">;

export function DialogBackdrop({
  className,
  transition = { duration: 0.2, ease: "easeInOut" },
  ...props
}: DialogBackdropProps) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-backdrop"
      className={cn(
        "fixed inset-0 z-50 bg-black/25 backdrop-blur-sm transition-all duration-1000",
        className,
      )}
      render={
        <motion.div
          key="dialog-backdrop"
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(4px)" }}
          transition={transition}
          {...props}
        />
      }
    />
  );
}

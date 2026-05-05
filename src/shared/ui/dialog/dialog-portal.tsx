"use client";

import * as React from "react";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { AnimatePresence } from "motion/react";

import { useDialog } from "./dialog.context";

export type DialogPortalProps = Omit<
  React.ComponentProps<typeof DialogPrimitive.Portal>,
  "keepMounted"
>;

export function DialogPortal(props: DialogPortalProps) {
  const { isOpen } = useDialog();

  return (
    <AnimatePresence>
      {isOpen && (
        <DialogPrimitive.Portal
          data-slot="dialog-portal"
          keepMounted
          {...props}
        />
      )}
    </AnimatePresence>
  );
}

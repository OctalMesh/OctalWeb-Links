"use client";

import * as React from "react";

import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
import { type SpringOptions, useMotionValue } from "motion/react";

import { useControlledState } from "@shared/lib/use-controlled-state";

import { PreviewCardProvider } from "./preview-card.context";

export type PreviewCardProps = React.ComponentProps<
  typeof PreviewCardPrimitive.Root
> & {
  followCursor?: boolean | "x" | "y";
  followCursorSpringOptions?: SpringOptions;
};

export function PreviewCard({
  followCursor = false,
  followCursorSpringOptions = { stiffness: 200, damping: 17 },
  ...props
}: PreviewCardProps) {
  const [isOpen, setIsOpen] = useControlledState({
    value: props?.open,
    defaultValue: props?.defaultOpen,
    onChange: (next) => {
      props?.onOpenChange?.(next, undefined as never);
    },
  });
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  return (
    <PreviewCardProvider
      value={{
        isOpen,
        setIsOpen: (next: boolean | ((arg0: boolean) => boolean)) => {
          setIsOpen(typeof next === "function" ? next(isOpen) : next);
        },
        x,
        y,
        followCursor,
        followCursorSpringOptions,
      }}
    >
      <PreviewCardPrimitive.Root
        data-slot="preview-card"
        {...props}
        onOpenChange={setIsOpen}
      />
    </PreviewCardProvider>
  );
}

"use client";

import { type VariantProps } from "class-variance-authority";
import { type HTMLMotionProps, motion } from "motion/react";

import { cn } from "@shared/lib/utils";
import { Slot } from "@shared/ui/slot";

import { buttonVariants } from "./button.styles";

const MotionSlot = motion.create(Slot);

export type ButtonPrimitiveProps = HTMLMotionProps<"button"> & {
  asChild?: boolean;
  hoverScale?: number;
  tapScale?: number;
};

export function ButtonPrimitive({
  hoverScale = 1.05,
  tapScale = 0.95,
  asChild = false,
  ...props
}: ButtonPrimitiveProps) {
  const Component = asChild ? MotionSlot : motion.button;

  return (
    <Component
      whileTap={{ scale: tapScale }}
      whileHover={{ scale: hoverScale }}
      {...(props as any)}
    />
  );
}

export type ButtonProps = ButtonPrimitiveProps &
  VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <ButtonPrimitive
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

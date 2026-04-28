"use client";

import { type HTMLMotionProps, motion } from "motion/react";

import { Slot } from "@shared/ui/primitives/animate/slot";

const MotionSlot = motion(Slot);

export type ButtonProps = HTMLMotionProps<"button"> & {
  asChild?: boolean;
  hoverScale?: number;
  tapScale?: number;
};

export function Button({ hoverScale = 1.05, tapScale = 0.95, asChild = false, ...props }: ButtonProps) {
  const Component = asChild ? MotionSlot : motion.button;

  return <Component whileTap={{ scale: tapScale }} whileHover={{ scale: hoverScale }} {...(props as any)} />;
}

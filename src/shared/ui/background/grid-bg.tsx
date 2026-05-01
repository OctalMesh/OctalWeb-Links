"use client";

import * as React from "react";

import {
  type SpringOptions,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";

import { cn } from "@shared/lib/utils";

type GridBackgroundProps = React.ComponentProps<"div"> & {
  cellSize?: number;
  strokeColor?: string;
  strokeWidth?: number;
  factor?: number;
  transition?: SpringOptions;
  fixed?: boolean;
  fadeCorners?: boolean;
};

export function GridBackground({
  className,
  children,
  cellSize = 40,
  strokeColor = "var(--fx-grid-stroke)",
  strokeWidth = 1,
  factor = 0.02,
  transition = { stiffness: 400, damping: 40 },
  fixed = true,
  fadeCorners = true,
  ...props
}: GridBackgroundProps) {
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);

  const springX = useSpring(offsetX, transition);
  const springY = useSpring(offsetY, transition);

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      offsetX.set(-(e.clientX - centerX) * factor);
      offsetY.set(-(e.clientY - centerY) * factor);
    },
    [offsetX, offsetY, factor],
  );

  return (
    <div
      data-slot="grid-background"
      className={cn(
        "overflow-hidden",
        fixed ? "fixed inset-0 z-0" : "absolute inset-0 z-0",
        className,
      )}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute"
        style={{
          x: springX,
          y: springY,
          top: "-5%",
          left: "-5%",
          width: "110%",
          height: "110%",
          backgroundImage: `
            linear-gradient(to right, ${strokeColor} ${strokeWidth}px, transparent ${strokeWidth}px),
            linear-gradient(to bottom, ${strokeColor} ${strokeWidth}px, transparent ${strokeWidth}px)
          `,
          backgroundSize: `${cellSize}px ${cellSize}px`,
          ...(fadeCorners && {
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 80%)",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          }),
        }}
      />
      {children}
    </div>
  );
}

export type { GridBackgroundProps };

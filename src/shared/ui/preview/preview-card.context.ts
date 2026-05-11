import { createContext } from "react";

import { type MotionValue, type SpringOptions } from "motion/react";

import { getStrictContext } from "@shared/lib";

export type PreviewCardContextType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean | ((prev: boolean) => boolean)) => void;
  x: MotionValue<number>;
  y: MotionValue<number>;
  followCursor?: boolean | "x" | "y";
  followCursorSpringOptions?: SpringOptions;
};

export const PreviewCardContext = createContext<PreviewCardContextType | null>(
  null,
);

export const [PreviewCardProvider, usePreviewCard] =
  getStrictContext<PreviewCardContextType>("PreviewCardContext");

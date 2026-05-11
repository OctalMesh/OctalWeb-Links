import { createContext } from "react";

import { getStrictContext } from "@shared/lib";

export type PreviewLinkCardContextType = {
  href: string;
  src?: string;
  width?: number;
  height?: number;
};

export const PreviewLinkCardContext =
  createContext<PreviewLinkCardContextType | null>(null);

export const [PreviewLinkCardProvider, usePreviewLinkCard] =
  getStrictContext<PreviewLinkCardContextType>("PreviewLinkCardContext");

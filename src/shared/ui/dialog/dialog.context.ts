import { getStrictContext } from "@shared/lib";

import type { DialogProps } from "./dialog";

export type DialogContextType = {
  isOpen: boolean;
  setIsOpen: DialogProps["onOpenChange"];
};

export const [DialogProvider, useDialog] =
  getStrictContext<DialogContextType>("DialogContext");

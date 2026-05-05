import { getStrictContext } from "@shared/lib";
import type { DialogProps } from "@shared/ui/index";

export type DialogContextType = {
  isOpen: boolean;
  setIsOpen: DialogProps["onOpenChange"];
};

export const [DialogProvider, useDialog] =
  getStrictContext<DialogContextType>("DialogContext");

import type { ComponentProps } from "react";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";

export type DialogCloseProps = ComponentProps<typeof DialogPrimitive.Close>;

export function DialogClose(props: DialogCloseProps) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

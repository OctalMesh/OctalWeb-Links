import * as React from "react";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";

import { useControlledState } from "@shared/lib";

import { DialogProvider } from "./dialog.context";

export type DialogProps = React.ComponentProps<typeof DialogPrimitive.Root>;

export function Dialog(props: DialogProps) {
  const [isOpen, setIsOpen] = useControlledState({
    value: props?.open,
    defaultValue: props?.defaultOpen,
    onChange: (v: boolean) => props?.onOpenChange?.(v as any, undefined as any),
  });

  return (
    <DialogProvider value={{ isOpen, setIsOpen }}>
      <DialogPrimitive.Root
        data-slot="dialog"
        {...props}
        onOpenChange={setIsOpen}
      />
    </DialogProvider>
  );
}

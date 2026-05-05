import * as React from "react";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";

import { cn } from "@shared/lib";

export type DialogDescriptionProps = React.ComponentProps<
  typeof DialogPrimitive.Description
>;

export function DialogDescription({
  className,
  ...props
}: DialogDescriptionProps) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

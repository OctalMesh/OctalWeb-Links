import type { ComponentProps } from "react";

import { cn } from "@shared/lib";

export type DialogFooterProps = ComponentProps<"div">;

export function DialogFooter({ className, ...props }: DialogFooterProps) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

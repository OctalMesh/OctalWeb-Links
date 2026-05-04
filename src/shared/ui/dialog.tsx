import { IconX } from "@tabler/icons-react";

import { cn } from "@shared/lib";
import { IconButton } from "@shared/ui/icon-button";
import {
  DialogBackdrop as DialogBackdropPrimitive,
  type DialogBackdropProps as DialogBackdropPrimitiveProps,
  DialogClose as DialogClosePrimitive,
  type DialogCloseProps as DialogClosePrimitiveProps,
  DialogDescription as DialogDescriptionPrimitive,
  type DialogDescriptionProps as DialogDescriptionPrimitiveProps,
  DialogFooter as DialogFooterPrimitive,
  type DialogFooterProps as DialogFooterPrimitiveProps,
  DialogHeader as DialogHeaderPrimitive,
  type DialogHeaderProps as DialogHeaderPrimitiveProps,
  DialogPopup as DialogPopupPrimitive,
  type DialogPopupProps as DialogPopupPrimitiveProps,
  DialogPortal as DialogPortalPrimitive,
  Dialog as DialogPrimitive,
  type DialogProps as DialogPrimitiveProps,
  DialogTitle as DialogTitlePrimitive,
  type DialogTitleProps as DialogTitlePrimitiveProps,
  DialogTrigger as DialogTriggerPrimitive,
  type DialogTriggerProps as DialogTriggerPrimitiveProps,
} from "@shared/ui/primitives/dialog";

type DialogProps = DialogPrimitiveProps;

function Dialog(props: DialogProps) {
  return <DialogPrimitive {...props} />;
}

type DialogTriggerProps = DialogTriggerPrimitiveProps;

function DialogTrigger(props: DialogTriggerProps) {
  return <DialogTriggerPrimitive {...props} />;
}

type DialogCloseProps = DialogClosePrimitiveProps;

function DialogClose(props: DialogCloseProps) {
  return <DialogClosePrimitive {...props} />;
}

type DialogBackdropProps = DialogBackdropPrimitiveProps;

function DialogBackdrop({ className, ...props }: DialogBackdropProps) {
  return (
    <DialogBackdropPrimitive
      className={cn(
        "fixed inset-0 z-50 bg-black/25 backdrop-blur-sm transition-all duration-1000",
        className,
      )}
      {...props}
    />
  );
}

type DialogPopupProps = DialogPopupPrimitiveProps & {
  showCloseButton?: boolean;
};

function DialogPopup({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogPopupProps) {
  return (
    <DialogPortalPrimitive>
      <DialogBackdrop />
      <DialogPopupPrimitive
        className={cn([
          "fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 p-4 pt-6 shadow-lg sm:max-w-lg",
          "rounded-lg border",
          "backdrop-blur-lg bg-fx-dialog-bg border-fx-dialog-border",
          className,
        ])}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogClosePrimitive className="ring-offset-background focus:ring-ring data-open:bg-accent data-open:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
            <IconButton variant={"outline"}>
              <IconX />
            </IconButton>
            <span className="sr-only">Close</span>
          </DialogClosePrimitive>
        )}
      </DialogPopupPrimitive>
    </DialogPortalPrimitive>
  );
}

type DialogHeaderProps = DialogHeaderPrimitiveProps;

function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return (
    <DialogHeaderPrimitive
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

type DialogFooterProps = DialogFooterPrimitiveProps;

function DialogFooter({ className, ...props }: DialogFooterProps) {
  return (
    <DialogFooterPrimitive
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

type DialogTitleProps = DialogTitlePrimitiveProps;

function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    <DialogTitlePrimitive
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  );
}

type DialogDescriptionProps = DialogDescriptionPrimitiveProps;

function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return (
    <DialogDescriptionPrimitive
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogPopup,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  type DialogProps,
  type DialogTriggerProps,
  type DialogCloseProps,
  type DialogPopupProps,
  type DialogHeaderProps,
  type DialogFooterProps,
  type DialogTitleProps,
  type DialogDescriptionProps,
};

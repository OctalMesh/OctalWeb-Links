"use client";

import { type VariantProps } from "class-variance-authority";

import { cn } from "@shared/lib/utils";
import { buttonVariants } from "@shared/ui/button.constants";
import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
} from "@shared/ui/primitives/buttons/button";

type ButtonProps = ButtonPrimitiveProps & VariantProps<typeof buttonVariants>;

function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <ButtonPrimitive
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, type ButtonProps };

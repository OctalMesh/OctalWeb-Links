"use client";

import * as React from "react";

import { type VariantProps } from "class-variance-authority";

import { cn } from "@shared/lib/utils";
import { Particles, ParticlesEffect } from "@shared/ui/effects";

import { ButtonPrimitive, type ButtonPrimitiveProps } from "./button";
import { iconButtonVariants } from "./icon-button.styles";

export type IconButtonProps = Omit<ButtonPrimitiveProps, "asChild"> &
  VariantProps<typeof iconButtonVariants> & {
    children?: React.ReactNode;
  };

export function IconButton({
  className,
  onClick,
  variant,
  size,
  children,
  ...props
}: IconButtonProps) {
  const [isActive, setIsActive] = React.useState(false);
  const [key, setKey] = React.useState(0);

  return (
    <Particles asChild animate={isActive} key={key}>
      <ButtonPrimitive
        data-slot="icon-button"
        className={cn(iconButtonVariants({ variant, size, className }))}
        onClick={(e) => {
          setKey((prev) => prev + 1);
          setIsActive(true);
          onClick?.(e);
        }}
        {...props}
      >
        {children}
        <ParticlesEffect
          data-variant={variant}
          className="size-1 rounded-full bg-neutral-500"
        />
      </ButtonPrimitive>
    </Particles>
  );
}

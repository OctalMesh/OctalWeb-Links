"use client";

import * as React from "react";

import { type VariantProps } from "class-variance-authority";

import { cn } from "@shared/lib/utils";
import { iconButtonVariants } from "@shared/ui/icon-button.constants";
import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
} from "@shared/ui/primitives/buttons/button";
import {
  Particles,
  ParticlesEffect,
} from "@shared/ui/primitives/effects/particles";

const buttonVariants = iconButtonVariants;

type IconButtonProps = Omit<ButtonPrimitiveProps, "asChild"> &
  VariantProps<typeof buttonVariants> & {
    children?: React.ReactNode;
  };

function IconButton({
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
        className={cn(buttonVariants({ variant, size, className }))}
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

export { IconButton, type IconButtonProps };

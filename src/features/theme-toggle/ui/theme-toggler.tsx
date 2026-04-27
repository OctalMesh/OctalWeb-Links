"use client";

import * as React from "react";

import { IconDeviceDesktop, IconMoon, IconSun } from "@tabler/icons-react";
import type { VariantProps } from "class-variance-authority";

import { getSystemTheme } from "@features/theme-toggle/lib/theme-utils";
import { useTheme } from "@features/theme-toggle/model";

import { cn } from "@shared/lib/utils";
import { buttonVariants } from "@shared/ui/icon-button";

import {
  type Resolved,
  type ThemeSelection,
  ThemeToggler as ThemeTogglerPrimitive,
  type ThemeTogglerProps as ThemeTogglerPrimitiveProps,
} from "./theme-toggler-primitive";

const getIcon = (effective: ThemeSelection, resolved: Resolved, modes: ThemeSelection[]) => {
  const theme = modes.includes("system") ? effective : resolved;
  return theme === "system" ? <IconDeviceDesktop /> : theme === "dark" ? <IconMoon /> : <IconSun />;
};

const getNextTheme = (effective: ThemeSelection, modes: ThemeSelection[]): ThemeSelection => {
  const i = modes.indexOf(effective);
  if (i === -1) return modes[0];
  return modes[(i + 1) % modes.length];
};

type ThemeTogglerButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    modes?: ThemeSelection[];
    onImmediateChange?: ThemeTogglerPrimitiveProps["onImmediateChange"];
    direction?: ThemeTogglerPrimitiveProps["direction"];
  };

function ThemeTogglerButton({
  variant = "default",
  size = "default",
  modes = ["light", "dark", "system"],
  direction = "ltr",
  onImmediateChange,
  onClick,
  className,
  ...props
}: ThemeTogglerButtonProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const effectiveTheme = mounted ? theme : "system";
  const resolvedTheme = effectiveTheme === "system" ? (mounted ? getSystemTheme() : "light") : effectiveTheme;

  return (
    <ThemeTogglerPrimitive
      theme={effectiveTheme as ThemeSelection}
      resolvedTheme={resolvedTheme as Resolved}
      setTheme={setTheme}
      direction={direction}
      onImmediateChange={onImmediateChange}
    >
      {({ effective, resolved, toggleTheme }) => (
        <button
          data-slot="theme-toggler-button"
          className={cn(buttonVariants({ variant, size, className }))}
          onClick={(e) => {
            onClick?.(e);
            toggleTheme(getNextTheme(effective, modes));
          }}
          {...props}
        >
          {mounted ? getIcon(effective, resolved, modes) : <IconDeviceDesktop />}
        </button>
      )}
    </ThemeTogglerPrimitive>
  );
}

export { ThemeTogglerButton, type ThemeTogglerButtonProps };

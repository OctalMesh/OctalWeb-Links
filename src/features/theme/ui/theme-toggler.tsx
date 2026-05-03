"use client";

import * as React from "react";
import { flushSync } from "react-dom";

import { IconDeviceDesktop, IconMoon, IconSun } from "@tabler/icons-react";
import { type VariantProps } from "class-variance-authority";

import { getSystemTheme, useTheme } from "@features/theme";

import { cn } from "@shared/lib/utils";
import { iconButtonVariants as buttonVariants } from "@shared/ui/icon-button.constants";

type ThemeSelection = "light" | "dark" | "system";
type Resolved = "light" | "dark";
type Direction = "btt" | "ttb" | "ltr" | "rtl";

export type ThemeTogglerButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    modes?: ThemeSelection[];
    direction?: Direction;
    onImmediateChange?: (theme: ThemeSelection) => void;
  };

const emptySubscribe = () => () => {};

function useIsMounted() {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

const getIcon = (theme: ThemeSelection) => {
  if (theme === "system") return <IconDeviceDesktop />;
  return theme === "dark" ? <IconMoon /> : <IconSun />;
};

const getClipKeyframes = (direction: Direction): [string, string] => {
  const corners: Record<Direction, [string, string]> = {
    btt: [
      "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ],
    ttb: [
      "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ],
    ltr: [
      "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ],
    rtl: [
      "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ],
  };
  return corners[direction];
};

export function ThemeTogglerButton({
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
  const isMounted = useIsMounted();
  const [transitioningTheme, setTransitioningTheme] =
    React.useState<ThemeSelection | null>(null);
  const effectiveTheme = (transitioningTheme ??
    theme ??
    "system") as ThemeSelection;
  const ariaLabel =
    (props["aria-label"] as string | undefined) ?? "Toggle color theme";

  React.useMemo(() => {
    if (!isMounted) return "light";
    return effectiveTheme === "system"
      ? getSystemTheme()
      : (effectiveTheme as Resolved);
  }, [isMounted, effectiveTheme]);

  const handleToggle = React.useCallback(async () => {
    const fallbackModes: readonly ThemeSelection[] = [
      "light",
      "dark",
      "system",
    ];
    const availableModes = modes.length > 0 ? modes : fallbackModes;
    const currentIndex = availableModes.indexOf(effectiveTheme);
    const nextTheme =
      availableModes[(currentIndex + 1) % availableModes.length] ?? "system";
    const nextResolved =
      nextTheme === "system" ? getSystemTheme() : (nextTheme as Resolved);

    setTransitioningTheme(nextTheme);
    onImmediateChange?.(nextTheme);

    if (!document.startViewTransition) {
      setTheme(nextTheme);
      setTransitioningTheme(null);
      return;
    }

    const [fromClip, toClip] = getClipKeyframes(direction);
    const transition = document.startViewTransition(() => {
      flushSync(() => {
        document.documentElement.classList.toggle(
          "dark",
          nextResolved === "dark",
        );
        document.documentElement.classList.toggle(
          "light",
          nextResolved === "light",
        );
      });
    });

    try {
      await transition.ready;
      await document.documentElement.animate(
        { clipPath: [fromClip, toClip] },
        {
          duration: 300,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        },
      ).finished;
    } finally {
      setTheme(nextTheme);
      setTransitioningTheme(null);
    }
  }, [effectiveTheme, modes, direction, setTheme, onImmediateChange]);

  if (!isMounted) {
    return (
      <button
        data-slot="theme-toggler-button"
        type="button"
        className={cn(buttonVariants({ variant, size, className }))}
        disabled
        aria-label={ariaLabel}
        {...props}
      >
        <IconDeviceDesktop />
      </button>
    );
  }

  return (
    <>
      <button
        data-slot="theme-toggler-button"
        type="button"
        className={cn(buttonVariants({ variant, size, className }))}
        onClick={(e) => {
          onClick?.(e);
          void handleToggle();
        }}
        aria-label={ariaLabel}
        {...props}
      >
        {getIcon(effectiveTheme)}
      </button>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation: none;
          mix-blend-mode: normal;
        }
      `,
        }}
      />
    </>
  );
}

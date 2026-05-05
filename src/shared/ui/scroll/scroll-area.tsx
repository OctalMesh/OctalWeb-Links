"use client";

import * as React from "react";

import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

import { cn } from "@shared/lib/utils";
import { IconButton } from "@shared/ui/button";

import { ScrollBar } from "./scroll-bar";

export interface ScrollAreaProps extends ScrollAreaPrimitive.Root.Props {
  withArrows?: boolean;
}

export function ScrollArea({
  className,
  children,
  withArrows = false,
  ...props
}: ScrollAreaProps) {
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  const checkScroll = React.useCallback(() => {
    const viewport = viewportRef.current;

    if (viewport) {
      const { scrollLeft, scrollWidth, clientWidth } = viewport;

      setCanScrollLeft(scrollLeft > 2);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 2);
    }
  }, []);

  React.useEffect(() => {
    const viewport = viewportRef.current;

    if (viewport) {
      checkScroll();
      viewport.addEventListener("scroll", checkScroll, { passive: true });

      const resizeObserver = new ResizeObserver(checkScroll);
      resizeObserver.observe(viewport);

      return () => {
        viewport.removeEventListener("scroll", checkScroll);
        resizeObserver.disconnect();
      };
    }
  }, [checkScroll]);

  const scroll = (e: React.MouseEvent, direction: "left" | "right") => {
    e.preventDefault();
    e.stopPropagation();

    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const scrollAmount = viewport.clientWidth / 2;
    viewport.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("group/scroll relative w-full", className)}
      {...props}
    >
      {withArrows && (
        <>
          <div
            className={cn(
              "absolute left-0 top-0 bottom-0 z-30 flex items-center pr-12 transition-all duration-300 pointer-events-none",
              "[@media(hover:none)]:hidden",
              "opacity-0 group-hover/scroll:opacity-100",
              canScrollLeft ? "visible" : "invisible opacity-0!",
            )}
          >
            <IconButton
              variant="outline"
              size={"xxl"}
              className="pointer-events-auto ml-2"
              onClick={(e) => scroll(e, "left")}
              type="button"
            >
              <IconChevronLeft />
            </IconButton>
          </div>

          <div
            className={cn(
              "absolute right-0 top-0 bottom-0 z-30 flex items-center pl-12 transition-all duration-300 pointer-events-none",
              "[@media(hover:none)]:hidden",
              "opacity-0 group-hover/scroll:opacity-100",
              canScrollRight ? "visible" : "invisible opacity-0!",
            )}
          >
            <IconButton
              variant="outline"
              size={"xxl"}
              className="pointer-events-auto mr-2"
              onClick={(e) => scroll(e, "right")}
              type="button"
            >
              <IconChevronRight size={20} />
            </IconButton>
          </div>
        </>
      )}

      <ScrollAreaPrimitive.Viewport
        ref={viewportRef}
        data-slot="scroll-area-viewport"
        className="size-full rounded-[inherit] outline-none"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar orientation="horizontal" />
      <ScrollBar orientation="vertical" />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

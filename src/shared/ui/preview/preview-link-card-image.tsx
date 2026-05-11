import * as React from "react";

import { IconLink } from "@tabler/icons-react";

import { usePreviewLinkCard } from "./preview-link-card.context";

export type PreviewLinkCardImageProps = Omit<
  React.ComponentProps<"img">,
  "src" | "width" | "height"
> & {
  fallbackIcon?: React.ReactNode;
};

export function PreviewLinkCardImage({
  alt = "preview image",
  ...props
}: PreviewLinkCardImageProps) {
  const { src, width, height } = usePreviewLinkCard() as {
    src: string;
    width: number;
    height: number;
  };

  const [status, setStatus] = React.useState<"loading" | "loaded" | "error">(
    () => (src ? "loading" : "error"),
  );

  React.useEffect(() => {
    if (!src) return;
    let mounted = true;
    const img = new Image();
    img.src = src;
    img.onload = () => mounted && setStatus("loaded");
    img.onerror = () => mounted && setStatus("error");
    return () => {
      mounted = false;
    };
  }, [src]);

  if (status === "loaded") {
    return (
      <img
        src={src}
        width={width}
        height={height}
        alt={alt}
        {...props}
        className="w-full h-full object-cover rounded-3xl"
      />
    );
  }

  const fallback = (props as any).fallbackIcon ?? <IconLink size={48} />;

  return (
    <div className="w-full h-48 flex items-center justify-center bg-(--fx-card-bg) text-(--fx-card-text) rounded-3xl">
      <div className="opacity-80">{fallback}</div>
    </div>
  );
}

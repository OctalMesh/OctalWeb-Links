import { useEffect } from "react";

import { PreviewCard, type PreviewCardProps } from "./preview-card";
import { PreviewLinkCardProvider } from "./preview-link-card.context";

export type PreviewLinkCardProps = PreviewCardProps & {
  href: string;
  src?: string;
  width?: number;
  height?: number;
  deviceScaleFactor?: number;
  colorScheme?: "light" | "dark";
};

export function PreviewLinkCard({
  href,
  src,
  width = 240,
  height = 135,
  deviceScaleFactor = 1,
  colorScheme = "light",
  ...props
}: PreviewLinkCardProps) {
  const imageSrc =
    src ??
    `https://api.microlink.io/?${buildQueryString({
      url: href,
      screenshot: true,
      meta: false,
      embed: "screenshot.url",
      colorScheme,
      "viewport.isMobile": true,
      "viewport.deviceScaleFactor": deviceScaleFactor,
      "viewport.width": width * 3,
      "viewport.height": height * 3,
    })}`;

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = imageSrc;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [imageSrc]);

  return (
    <PreviewLinkCardProvider value={{ href, src: imageSrc, width, height }}>
      <PreviewCard data-slot="preview-link-card" {...props} />
    </PreviewLinkCardProvider>
  );
}

function buildQueryString(
  params: Record<string, string | number | boolean | undefined | null>,
) {
  const sp = new URLSearchParams();

  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null) {
      continue;
    }

    sp.append(k, String(v));
  }

  return sp.toString();
}

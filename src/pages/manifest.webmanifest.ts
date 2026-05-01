import { siteConfig } from "@shared/config";

export const prerender = true;

export async function GET() {
  const { name, shortName, description, pwa } = siteConfig;

  const manifest = {
    name,
    short_name: shortName,
    description,
    start_url: pwa.startUrl,
    scope: pwa.scope,
    display: pwa.display,
    background_color: pwa.backgroundColor,
    theme_color: pwa.themeColor,
    icons: pwa.icons,
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/manifest+json; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}

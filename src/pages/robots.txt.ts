import { siteConfig } from "@shared/config/site";

export const prerender = true;

export async function GET() {
  const { robots } = siteConfig;
  const disallowRules = robots.disallow.map((path) => `Disallow: ${path}`).join("\n");
  const contentSignal = [
    `ai-train=${robots.contentSignals.aiTrain ? "yes" : "no"}`,
    `search=${robots.contentSignals.search ? "yes" : "no"}`,
    `ai-input=${robots.contentSignals.aiInput ? "yes" : "no"}`,
  ].join(", ");

  const robotsContent = `\
User-agent: *
Allow: /

${disallowRules}

Content-Signal: ${contentSignal}

Sitemap: ${robots.sitemapUrl}
`;

  return new Response(robotsContent, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}

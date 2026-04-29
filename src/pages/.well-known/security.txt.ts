import { siteConfig } from "@shared/config/site";

export const prerender = true;

export async function GET() {
  const { security } = siteConfig;
  const preferredLanguages = security.preferredLanguages.join(", ");

  const securityContent = `\
Contact: ${security.contact}
Expires: ${security.expires}
Canonical: ${security.canonical}
Policy: ${security.policy}
Preferred-Languages: ${preferredLanguages}
`;

  return new Response(securityContent, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}

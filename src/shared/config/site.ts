export const siteConfig = {
  /* Basic Metadata */

  name: "OctalMesh - Links",
  shortName: "OctalLinks",
  description:
    "OctalMesh Links is the official multilingual hub for OctalMesh social channels, contact endpoints, and community destinations, built for fast navigation, clear access, and reliable sharing.",
  canonical: "https://links.octalmesh.com",
  author: "OctalMesh",
  image: "/assets/og-image.png",
  keywords: ["OctalMesh", "OctalLinks", "OctalSocials", "Links", "Socials"],

  /* Social */

  twitter: "@octalmesh",
  sameAs: [
    "https://github.com/OctalMesh/",
    "https://x.com/octalmesh",
    "https://t.me/octalmesh",
    "https://youtube.com/@octalmesh",
    "https://instagram.com/octalmesh",
    "https://linkedin.com/company/octalmesh",
    "https://reddit.com/r/octalmesh/",
    "https://tiktok.com/@octalmesh",
    "https://patreon.com/c/octalmesh",
  ],

  /* PWA Manifest */

  pwa: {
    display: "standalone",
    backgroundColor: "#111111",
    themeColor: "#111111",
    startUrl: "/",
    scope: "/",
    icons: [
      {
        src: "/assets/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/assets/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },

  /* SEO & Robots */

  robots: {
    sitemapUrl: "https://links.octalmesh.com/sitemap-index.xml",
    contentSignals: {
      aiTrain: true,
      search: true,
      aiInput: true,
    },
    disallow: ["/_astro/", "/assets/", "/api/", "/email", "/manager", "/telegram_manager"],
  },

  /* Security (RFC 9116) */

  security: {
    contact: "mailto:security@octalmesh.com",
    expires: "2030-01-01T12:00:00Z",
    canonical: "https://octalmesh.com/.well-known/security.txt",
    policy: "https://github.com/OctalMesh/OctalWeb/security",
    preferredLanguages: ["en", "uk", "ru"],
  },
};

export type SiteConfig = typeof siteConfig;

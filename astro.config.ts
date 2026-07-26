import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

/**
 * Astro configuration
 *
 * @see {@link https://docs.astro.build/en/reference/configuration-reference/
 *      Astro documentation}
 */
export default defineConfig({
  site: "https://links.octalmesh.com",
  output: "static",
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    server: {
      // Docker Desktop on Windows uses WSL2 - filesystem events from the Windows
      // host do not propagate into the Linux container, so chokidar never sees
      // file changes. Polling is the only reliable solution for bind-mounted dev.
      watch: {
        usePolling: true,
        interval: 500,
      },
    },
  },
});

import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  define: {
    "import.meta.env.VITE_BASENAME": JSON.stringify(process.env.VITE_BASENAME || ""),
  },
  server: {
    // Docker Desktop on Windows uses WSL2 - filesystem events from the Windows
    // host do not propagate into the Linux container, so chokidar never sees
    // file changes. Polling is the only reliable solution for bind-mounted dev.
    watch: {
      usePolling: true,
      interval: 500,
    },
  },
});

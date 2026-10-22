// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), tanstackStart(), viteReact()],
  nitro: { preset: "node-server" },
  preview: { allowedHosts: true },
    build: {
    cssMinify: "esbuild",
      chunkSizeWarningLimit: 400,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: "vendor-supabase", test: /node_modules\/@supabase\//, priority: 20 },
            { name: "vendor-motion",   test: /node_modules\/(motion|motion-dom|motion-utils)\//, priority: 20 },
            { name: "vendor-router",   test: /node_modules\/@tanstack\/(react-router|router-core|history)\//, priority: 15 },
            { name: "vendor-query",    test: /node_modules\/@tanstack\/query-core\//, priority: 15 },
            { name: "vendor-radix",    test: /node_modules\/@radix-ui\//, priority: 10 },
            { name: "vendor-react",    test: /node_modules\/(react|react-dom|scheduler)\//, priority: 10 },
            { name: "vendor-misc",     test: /node_modules\//, priority: 0 },
          ],
        },
      },
    },
  },
});
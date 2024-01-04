import { defineConfig } from "vite";
import { resolve } from "path";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    [react()],
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "CropDate",
        start_url: "/",
        orientation: "any",
        theme_color: "#16a34a",
        background_color: "#16a34a",
        scope: "/",
        display: "standalone",
        icons: [
          {
            src: "leaf_6_white.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "leaf_green_bg.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*"],
        globDirectory: "dist",
      },
    }),
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss(resolve(__dirname, "./tailwind.config.js")),
        autoprefixer,
      ],
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: true,
    rollupOptions: {
      input: "index.html",
      output: {
        manualChunks: (path) =>
          path.split("/").reverse()[
            path.split("/").reverse().indexOf("node_modules") - 1
          ],
      },
    },
  },
});

import { defineConfig } from "vite";
import { resolve } from "path";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [[react()]],
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
    },
  },
});

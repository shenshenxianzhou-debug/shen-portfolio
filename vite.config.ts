import { copyFileSync } from "node:fs";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

function pagesFallback(): Plugin {
  return {
    name: "pages-404",
    apply: "build",
    closeBundle() {
      copyFileSync("dist/index.html", "dist/404.html");
    },
  };
}

export default defineConfig({
  base: "/shen-portfolio/",
  plugins: [react(), tailwindcss(), pagesFallback()],
  build: {
    assetsDir: "static",
    emptyOutDir: true,
  },
});

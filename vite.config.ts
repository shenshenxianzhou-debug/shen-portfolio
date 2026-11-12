import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/shen-portfolio/",
  plugins: [react(), tailwindcss()],
  build: {
    assetsDir: "static",
    emptyOutDir: true,
  },
});

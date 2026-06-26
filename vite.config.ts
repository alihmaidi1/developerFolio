import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    /**
     * Pre-bundle the heavy 3D stack so dynamic-import of HeroVideoCanvas
     * never trips the "Outdated Optimize Dep" 504 after a fresh install.
     */
    include: ["@react-three/fiber", "@react-three/drei", "three"],
  },
});

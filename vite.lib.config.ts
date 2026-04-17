import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const externalPackages = [
  "react",
  "react-dom",
  "clsx",
  "immer",
  "react-freeze",
  "zustand",
];

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    lib: {
      entry: "src/index.ts",
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "index.js" : "index.cjs"),
      cssFileName: "style",
    },
    rollupOptions: {
      external: (id) =>
        externalPackages.some((pkg) => id === pkg || id.startsWith(`${pkg}/`)),
    },
  },
});

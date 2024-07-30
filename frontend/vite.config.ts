import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    cors: false,
    proxy: {
      "/api": {
        target: "http://affederation.net/",
        changeOrigin: true,
        secure: false,
      },
    },
    host: true,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

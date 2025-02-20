import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
       // target: "https://affederation.net/",
       target: 'http://127.0.0.1:5000',
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

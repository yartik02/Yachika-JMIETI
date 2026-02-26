import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { qrcode } from "vite-plugin-qrcode"; // ✅ use named import

export default defineConfig({
  plugins: [react(), qrcode()],
  server: {
    host: true, // so your LAN IP works
  },
});

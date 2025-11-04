import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["jks39d-5173.csb.app"], // 👈 Replace with your CodeSandbox domain
  },
});

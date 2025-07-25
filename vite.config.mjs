import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// Tailwind CSS is handled via PostCSS, not as a Vite plugin.

export default defineConfig({
  plugins: [react(), tailwindcss()],
});

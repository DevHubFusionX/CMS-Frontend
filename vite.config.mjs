import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import compression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    compression()
  ],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['react-icons', 'framer-motion'],
          editor: ['@tinymce/tinymce-react', '@tiptap/react', '@tiptap/starter-kit'],
          utils: ['axios', '@tanstack/react-query'],
          socket: ['socket.io-client']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});

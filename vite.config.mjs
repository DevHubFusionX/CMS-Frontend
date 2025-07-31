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
    sourcemap: false,
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
        unused: true
      },
      mangle: true
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react';
            }
            if (id.includes('tinymce') || id.includes('tiptap')) {
              return 'editor';
            }
            if (id.includes('framer-motion') || id.includes('react-icons')) {
              return 'ui';
            }
            return 'vendor';
          }
        }
      }
    },
    chunkSizeWarningLimit: 500
  }
});

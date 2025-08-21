// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Enable image optimization
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    },
    remotePatterns: [{ protocol: "https" }],
    formats: ['webp', 'avif'],
    quality: 80,
  },
  
  // Enable compression
  compressHTML: true,
  
  // Build optimizations
  build: {
    inlineStylesheets: 'auto',
  },
  
  // Vite optimizations for better performance
  vite: {
    build: {
      cssMinify: true,
      minify: 'terser',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['astro'],
          },
        },
      },
    },
    css: {
      devSourcemap: false,
    },
  },
});

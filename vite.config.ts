import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],

  build: {
    // Target modern browsers only — drop legacy polyfills
    target: 'es2020',

    // Inline small assets to reduce HTTP requests
    assetsInlineLimit: 4096,

    // Better chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // GSAP as shared vendor chunk (used by Home + potentially others)
          'gsap': ['gsap', 'gsap/ScrollTrigger'],
          // Vue ecosystem in one chunk
          'vue-vendor': ['vue', 'vue-router'],
          // Smooth scroll library
          'lenis': ['lenis'],
        },
      },
    },

    // Enable CSS code splitting
    cssCodeSplit: true,

    // Use default esbuild minification (faster than terser, good enough)
    minify: 'esbuild',
  },

  // Dependency pre-bundling
  optimizeDeps: {
    include: ['vue', 'vue-router', 'gsap', 'lenis'],
  },
})

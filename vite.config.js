import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { base44 } from '@base44/vite-plugin'
import path from 'node:path'

export default defineConfig({
  logLevel: 'error',

  plugins: [
    base44({
      // Legacy Base44 SDK compatibility
      legacySDKImports:
        process.env.BASE44_LEGACY_SDK_IMPORTS === 'true',

      hmrNotifier: true,
      navigationNotifier: true,
      analyticsTracker: true,
      visualEditAgent: true,
    }),

    react(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    host: true,
    port: 5173,
  },

  preview: {
    host: true,
    port: 4173,
  },

  build: {
    target: 'es2022',
    sourcemap: false,
    emptyOutDir: true,
  },
})

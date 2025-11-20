/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Separate vendor libraries into their own chunks
          if (id.includes('node_modules')) {
            // Framer Motion
            if (id.includes('framer-motion')) {
              return 'framer-motion'
            }
            // Lucide React
            if (id.includes('lucide-react')) {
              return 'lucide-react'
            }
            // React and React DOM
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor'
            }
            // React Shiki (will be lazy loaded, but separate chunk if included)
            if (id.includes('react-shiki') || id.includes('shiki')) {
              return 'react-shiki'
            }
            // JSZip (will be lazy loaded, but separate chunk if included)
            if (id.includes('jszip')) {
              return 'jszip'
            }
            // Other node_modules
            return 'vendor'
          }
        }
      }
    },
    // Enable minification and compression
    minify: 'esbuild',
    // Increase chunk size warning limit since we're splitting chunks
    chunkSizeWarningLimit: 1000
  },
  test: {
    projects: [{
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        },
        setupFiles: ['.storybook/vitest.setup.js']
      }
    }]
  }
});
import { defineConfig } from 'tsup'

export default defineConfig([
  // ESM / CJS build
  {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    clean: true,
    minify: false
  },

  // Browser global build
  {
    entry: ['src/browser.ts'],
    format: ['iife'],
    sourcemap: true,
    minify: true
  }
])

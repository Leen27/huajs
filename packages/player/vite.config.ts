import { fileURLToPath, URL } from 'node:url'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts(),
    splitVendorChunkPlugin()
  ],
  resolve: {
    alias: {
      '@player': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },

  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'huajsPlayer',
      fileName: 'huajs-player',
      formats: ["es", "cjs", "umd", "iife"],
    },
    rollupOptions: {
      external: [],
      output: {
      },
    },
  },
})

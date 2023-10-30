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
      '@zixian-vue-repo': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },

  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'huajsRepo',
      // the proper extensions will be added
      fileName: 'zixian-vue-repo',
      formats: ["es", "cjs", "umd", "iife"],
    },
    rollupOptions: {
      external: ['vue', 'pinia'],
      output: {
      },
    },
  },
})

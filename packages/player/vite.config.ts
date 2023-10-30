// vite.config.js
import { resolve } from 'path'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts(),
    splitVendorChunkPlugin()
  ],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'zixianPlayer',
      // the proper extensions will be added
      fileName: 'zixian-player',
    },
    // rollupOptions: {
    //   // 确保外部化处理那些你不想打包进库的依赖
    //   external: ['pixi.js'],
    // },
  },
})

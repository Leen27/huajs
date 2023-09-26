import { fileURLToPath, URL } from 'node:url'

import UnoCSS from 'unocss/vite'
import { presetUno, presetAttributify, presetIcons } from 'unocss'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    UnoCSS({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          // extraProperties: {
          //   'display': 'inline-block',
          //   'vertical-align': 'middle',
          // },
          // collections: {
          //   // custom: FileSystemIconLoader(iconDirectory),
          // },
        }),
      ] 
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

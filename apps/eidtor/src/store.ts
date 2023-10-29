import { type Plugin, type App } from 'vue'
import { createPinia } from 'pinia'
import { createORM } from 'pinia-orm'
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2'
import localforage from 'localforage'

export const useStore = (app: App) => {
  const pinia = createPinia()
  // pinia.use(createORM())

  pinia.use(
    createPersistedStatePlugin({
      storage: {
        getItem: async (key) => {
          return localforage.getItem(key)
        },
        setItem: async (key, value) => {
          return localforage.setItem(key, value)
        },
        removeItem: async (key) => {
          return localforage.removeItem(key)
        },
      },
    }),
  )

  app.use(pinia)
}

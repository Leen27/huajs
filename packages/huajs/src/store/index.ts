import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export type ItemT = {
    position: {
        x: number
        y: number
    }
}

export const useItemsStore = defineStore('items', () => {
    const items = ref<Array<ItemT>>([{ "position": { "x": 121.24491435095517, "y": 151.63091612853805 } }, { "position": { "x": 168.04221228469854, "y": 164.92300427382168 } }, { "position": { "x": 141.41420829337198, "y": 185.23658416439505 } }, { "position": { "x": 174.92374904894064, "y": 197.44879864300933 } }, { "position": { "x": 113.82342455172186, "y": 110.8661655101325 } }])

    return { items }
})

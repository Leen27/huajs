import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type ShapeT } from 'huajs-common'
export const useNodesStore = defineStore('Nodes', () => {
    const nodes = ref<Array<ShapeT>>([])

    return { nodes }
})

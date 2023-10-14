import { ref } from 'vue'
import { defineStore } from 'pinia'

export type NodeT = {
    id: string
    position: {
        x: number
        y: number
    }
}

export const useNodesStore = defineStore('Nodes', () => {
    const nodes = ref<Array<NodeT>>([])

    return { nodes }
})

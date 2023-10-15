import { useNodesStore, type NodeT } from './store'

export const commands: Record<string, (...args: any[]) => Promise<any>> = {
  ['ADD_NODE']: (node: NodeT) => {
    const store = useNodesStore()
    store.nodes.push(node)
    return Promise.resolve()
  },
  ['DEL_NODE']: (node: NodeT) => {
    const store = useNodesStore()
    const finded = store.nodes.findIndex(i => i.id == node.id) 
    if (finded > -1) store.nodes.splice(finded, 1)
    return Promise.resolve()
  }
}
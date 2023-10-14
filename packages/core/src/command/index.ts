import { useNodesStore, type NodeT } from '../store'

export const commands = {
  ['ADD_NODE']: (node: NodeT) => {
    const store = useNodesStore()
    store.nodes.push(node)
  },
  ['DEL_NODE']: (node: NodeT) => {
    const store = useNodesStore()
    const finded = store.nodes.findIndex(i => i.id == node.id) 
    if (finded > -1) store.nodes.splice(finded, 1)
  }
}
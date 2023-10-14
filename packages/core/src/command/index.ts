import { useNodesStore, type NodeT } from '../store'

export const commands = {
  ['ADD_NODE']: (node: NodeT) => {
    const store = useNodesStore()
    store.nodes.push(node)
    console.log(store.nodes, 'ssss')
  },
  ['DEL_NODE']: (node: NodeT) => {
    const store = useNodesStore()
    const finded = store.nodes.findIndex(i => i.id == node.id) 
  }
}
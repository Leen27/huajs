import Konva from 'konva'
import { World } from 'miniplex'
import { type EntityData } from '../core/engine'

export function createRenderSystem(world: World) {
  const engines = world.with('renderEngine')
  const entities = world.with('position')

  entities.onEntityAdded.subscribe((entity: EntityData) => {
    const node = new Konva.Rect({
      x: entity.position?.x || 0,
      y: entity.position?.y || 0,
      width: 100,
      height: 50,
      fill: 'green',
      stroke: 'black',
      strokeWidth: 4,
      draggable: true
    })
    node.on('dragmove', (evt) => {
      const node = evt.target
      entity.position = node.position()
    })
    node.on('mouseover', () => {
      document.body.style.cursor = 'pointer'
    })
    node.on('mouseout', () => {
      document.body.style.cursor = 'default'
    })
    // 将形状添加到图层
    const [{ renderEngine }] = engines
    renderEngine.layer.add(node)
  })

  return () => {}
}
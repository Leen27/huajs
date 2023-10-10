import Konva from 'konva'
import { World } from 'miniplex'

export function createRenderSystem(world: World) {
  const engines = world.with('renderEngine')
  const entities = world.with('position')

  entities.onEntityAdded.subscribe((entity: any) => {
    console.log(entity, '#1 added')
    const rect1 = new Konva.Rect({
      x: entity.position.x,
      y: entity.position.y,
      width: 100,
      height: 50,
      fill: 'green',
      stroke: 'black',
      strokeWidth: 4,
      draggable: true
    }); // 将形状添加到图层
    const [{ renderEngine }] = engines
  console.log(renderEngine)
    renderEngine.layer.add(rect1);
  })

  return () => {}
}
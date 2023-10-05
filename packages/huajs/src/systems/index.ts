import Konva from 'konva'
import { System } from '../core/system'
import { Query } from '../core/world'
import { Hua } from '../core/hua'

export class RenderSystem extends System {
  hua: Hua

  queries: Query<
    {
      position: {
        x: number
        y: number
      }
    }
  >

  init(hua: Hua) {
    this.hua = hua
    this.queries = this.world.with('position')

    console.log(this.queries, hua, '#1')

    this.update()

    this.queries.onEntityAdded.subscribe((entity: any) => {
      console.log(entity, '#1 added')
      this.renderAdded(entity)
    })
  }

  renderAdded(entity: any) {
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

    this.hua.layer.add(rect1);
  }
}
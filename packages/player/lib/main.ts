import { Graphics, Application } from 'pixi.js';
import { isString, assert } from 'zixian-utils'
import { ShapeT } from 'zixian-common'

export const createShape = (graphics: Graphics, config: ShapeT) => {
    const { position, size } = config

    graphics.lineStyle(0); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
    graphics.beginFill(0xDE3249, 1);
    graphics.drawCircle(position?.x || 0, position?.y || 0, size?.radius || 50);
    graphics.endFill();
}

export const initEntities = (app: Application) => (entities: ShapeT[]) => {
    const graphics = new Graphics();

    entities.forEach(entity => {
        createShape(graphics, entity)
    })

    app.stage.addChild(graphics)
}

export const createPlayer = (parent: HTMLElement | string) => {
    assert(!!parent, '请提供渲染的容器')

    if (isString(parent)) {
        const container: HTMLElement | null = document.body.querySelector(parent)

        assert(!!container, `无法找到 ${parent} 的 dom`)

        parent = container
    }

    const app: Application = new Application({ background: '#1099bb', resizeTo: window });

    parent.appendChild(app.view as unknown as HTMLCanvasElement);

    return {
        app,
        initEntities: initEntities(app)
    }
}
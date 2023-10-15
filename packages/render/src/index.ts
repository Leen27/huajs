import { createApp, type App } from 'vue';
import GraphView from './canvas/GraphView.vue'
import VueKonva from 'vue-konva';
import { commands } from './commands'
import { Engine, type EngineOptions } from 'huajs-core'

export class RenderEngine extends Engine {
  declare _vue_app: App

  constructor(options: EngineOptions) {
    super()

    const { id } = options

    this._vue_app = this.initApp(id)
    this.commands = commands
  }

  initApp(id: string) {
    const app = createApp(GraphView, {
      eventBus: this.eventBus
    })
    app.use(VueKonva)
    app.mount(`#${id}`)

    return app
  }
}
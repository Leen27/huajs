import { createApp, type App } from 'vue';
import GraphView from './GraphView.vue'
import VueKonva from 'vue-konva';
import { Invoker, type ICommand } from '../command';
import { createEventBus, EventBus } from '../eventBus'

export type EngineOptions = {
  id: string
}

export class Engine {
  declare invoker: Invoker
  declare eventBus: EventBus

  constructor() {
    this.invoker = new Invoker()
  }

  command(commandName: string | ICommand, ...args: any) {
    return this.invoker.execute(commandName, this, ...args)
  }

  on(eventName: string, callback: (...args: any) => any ): void {
    return
  }
}

export class RenderEngine extends Engine {
  declare _vue_app: App

  constructor(options: EngineOptions) {
    super()

    const { id } = options

    this._vue_app = this.initApp(id)
  }

  initApp(id: string) {
    const app = createApp(GraphView);
    app.use(VueKonva);
    app.mount(`#${id}`);

    return app
  }
}
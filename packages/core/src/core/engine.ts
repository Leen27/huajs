import { createApp, type App } from 'vue';
import GraphView from '../canvas/GraphView.vue'
import VueKonva from 'vue-konva';
import { createEventBus, type EventBus } from '../eventBus'
import { commands } from '../command'

export type EngineOptions = {
  id: string
}

export class Engine {
  
  declare eventBus: EventBus
  declare commands: Record<string, any>

  constructor() {
    this.eventBus = createEventBus()
    this.commands = []
  }

  command(commandName: string, ...args: any) {
    const cmd = this.commands[commandName]
    cmd && cmd(...args)
    return Promise.resolve('')
  }

  on(eventName: string, callback: (...args: any) => any ): EventBus {
    this.eventBus.on(eventName, callback)
    return this.eventBus
  }

  off(eventName: string, callback: (...args: any) => any) {
    return this.eventBus.off(eventName, callback)
  }
}

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
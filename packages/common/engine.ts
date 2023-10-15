import { createEventBus, type EventBus } from './event-bus'

export type EngineOptions = {
  id: string,
}

export class Engine {
  
  declare eventBus: EventBus
  declare commands: Record<string, any>

  constructor() {
    this.eventBus = createEventBus()
    this.commands = []
  }

  async command(commandName: string, ...args: any) {
    const cmd = this.commands[commandName]
    cmd && await cmd(...args)
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

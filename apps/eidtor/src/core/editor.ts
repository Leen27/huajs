import { RenderEngine, type EngineOptions } from 'huajs-core'
import { Invoker, type ICommand } from '@/core/command'

class Editor {
  declare invoker: Invoker
  declare renderEngine: RenderEngine
  
  constructor(configs: EngineOptions) {
    this.invoker = new Invoker()
    this.renderEngine = new RenderEngine(configs)
  }

  command(commandName: string | ICommand, ...args: any) {
    return this.invoker.execute(commandName, this, ...args)
  }

  undo() {
    this.invoker.undo()
  }
}

export default Editor
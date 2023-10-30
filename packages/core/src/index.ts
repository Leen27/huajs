import { Invoker, type ICommand } from './command'
import { type EngineOptions } from 'zixian-vue/common'
import { RenderEngine } from 'zixian-vue/render'
import Repos from 'zixian-vue/repo'

class Editor {
  declare invoker: Invoker
  declare renderEngine: RenderEngine
  
  constructor(configs: EngineOptions) {
    this.invoker = new Invoker()
    this.renderEngine = new RenderEngine(configs)

    this.on('render:dragend', (item: any) => {
      const posRepo = Repos.entity()

      this.command('ChangePosition', posRepo, item)
    })
  }

  on(type: string, callback: (...args: any[]) => any) {
    const [engineName, evtName] = type.split(':')
    const engine = {
      'render': this.renderEngine
    }[engineName]
    if(!engine) return

    engine.on(evtName, callback)
  }

  command(commandName: string | ICommand, ...args: any) {
    return this.invoker.execute(commandName, this, ...args)
  }

  undo() {
    this.invoker.undo()
  }
}

export default Editor
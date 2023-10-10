import type { ICommand } from "huajs-core";
import Engine from 'huajs-core'
import { Invoker } from "./invoker";

type EditorConfigT = {
  layers: Array<{
    items: any[]
  }>
}

class Editor {
  invoker: Invoker
  engine: Engine
  
  constructor(id: string, configs: EditorConfigT) {
    this.invoker = new Invoker()
    this.engine = new Engine({ id, layers: configs.layers })
  }

  command(commandName: string | ICommand, ...args: any) {
    return this.invoker.execute(commandName, this.engine, ...args)
  }
}

export default Editor
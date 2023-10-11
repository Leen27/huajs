import { Engine } from '../core/engine'
import { useItemsStore } from '@huajs-core/store'
/**
 * The Command interface declares a method for executing a command.
 */
export interface ICommand {
  execute(): Promise<any>
  undo(): Promise<any>
}

export interface ICommandWithConsturctor {
  new(...args: any): ICommand
}

export class AddShapeCommand implements ICommand {
  engine: Engine
  declare data: Pick<ReturnType<typeof useItemsStore>, 'items'>
  store: ReturnType<typeof useItemsStore>

  constructor(engine: Engine, data: AddShapeCommand["data"]) {
    this.engine = engine
    this.data = data
    this.store = useItemsStore()
  }

  public execute() {
    this.store.items.push(this.data.item)
    return Promise.resolve()
  }

  public undo() {
    // this.engine.world.remove(this.entity)
    // this.entity = undefined
    // console.log(`SimpleCommand: See, I can do simple things like printing (${this.constructor.name})`)
    return Promise.resolve()
  }
}



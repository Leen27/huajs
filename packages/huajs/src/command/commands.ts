import { Engine } from '../core/engine'
import { useItemsStore, type ItemT } from '@huajs-core/store'
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
  declare item: ItemT
  store: ReturnType<typeof useItemsStore>

  constructor(engine: Engine, item: ItemT) {
    this.engine = engine
    this.item = item
    this.store = useItemsStore()
  }

  public execute() {
    this.store.items.push(this.item)
    return Promise.resolve()
  }

  public undo() {
    const index = this.store.items.indexOf(this.item)
    this.store.items.splice(index, 1)
    return Promise.resolve()
  }
}



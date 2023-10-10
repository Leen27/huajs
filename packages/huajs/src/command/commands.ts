import { Engine } from '../core/engine'

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
  entity: any
  data: object

  constructor(engine: Engine, data: Object) {
    this.engine = engine
    this.data = data
  }

  public execute() {
    // this.entity = this.engine.world.add(this.data)

    // console.log(this.entity)

    return Promise.resolve(this.entity)
  }

  public undo() {
    // this.engine.world.remove(this.entity)
    // this.entity = undefined
    // console.log(`SimpleCommand: See, I can do simple things like printing (${this.constructor.name})`)
    return Promise.resolve()
  }
}



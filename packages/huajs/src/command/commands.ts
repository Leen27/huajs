import { PosComponent } from '../components'
import { Entity } from '../core/entity'
import { Hua } from '../core/hua'

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
  ctx: Hua
  constructor(ctx: Hua) {
    this.ctx = ctx
  }

  public execute() {
    const shape = new Entity()
    shape.addComponent(new PosComponent())
    return Promise.resolve()
  }

  public undo() {
    console.log(`SimpleCommand: See, I can do simple things like printing (${this.constructor.name})`)
    return Promise.resolve()
  }
}



import Hua from '../index'

/**
 * The Command interface declares a method for executing a command.
 */
export interface ICommand {
  name: string
  execute(): Promise<any>
  undo(): Promise<any>
}

export class AddShapeCommand implements ICommand {
  name: string
  ctx: Hua
  constructor(ctx: Hua) {
    this.name = 'ADD_SHAPE'
    this.ctx = ctx
  }

  public execute() {
    console.log(`SimpleCommand: See, I can do simple things like printing (${this.name})`)
    return Promise.resolve()
  }

  public undo() {
    console.log(`SimpleCommand: See, I can do simple things like printing (${this.name})`)
    return Promise.resolve()
  }
}



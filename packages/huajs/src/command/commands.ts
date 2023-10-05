import { world } from '../core/world'
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

type CommandCtx = {
  graphics: Hua
}

export class AddShapeCommand implements ICommand {
  ctx: CommandCtx

  constructor(ctx: CommandCtx) {
    this.ctx = ctx
  }

  public execute() {
    world.add({
      position: {
        x: 100 + Math.random() * 100,
        y: 100 + Math.random() * 100
      }
    })

    return Promise.resolve()
  }

  public undo() {
    console.log(`SimpleCommand: See, I can do simple things like printing (${this.constructor.name})`)
    return Promise.resolve()
  }
}



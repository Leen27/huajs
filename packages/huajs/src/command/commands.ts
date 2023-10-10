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

  constructor(engine: Engine) {
    this.engine = engine
  }

  public execute() {
    this.engine.world.add({
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



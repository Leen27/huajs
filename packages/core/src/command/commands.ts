import { Engine, type ShapeT } from 'huajs-common'
import { useRepo } from 'pinia-orm'
import type Editor from '../index'
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
  render: Engine
  declare shape: ShapeT
  repo: ReturnType<typeof useRepo>

  constructor(eidtor: Editor, repo: ReturnType<typeof useRepo>, shape: ShapeT) {
    this.render = eidtor.renderEngine
    this.shape =shape 
    this.repo = repo
  }

  public async execute() {
    await this.render.command('ADD_NODE', this.shape)
    this.repo.save(this.shape)

    return Promise.resolve()
  }

  public async undo() {
    await this.render.command('DEL_NODE', this.shape)
    this.repo.destroy(this.shape.id!)
    
    return Promise.resolve()
  }
}



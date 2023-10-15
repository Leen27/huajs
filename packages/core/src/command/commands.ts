import { Engine } from '../engine'
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

type ItemT = {
  id?: string
  position?: {
    id?: string
    x: number,
    y: number
  }
  size?: {
    id?: string
    width: number
    height: number
  }
}

export class AddShapeCommand implements ICommand {
  render: Engine
  declare item: ItemT
  repo: ReturnType<typeof useRepo>

  constructor(eidtor: Editor, repo: ReturnType<typeof useRepo>, item: ItemT) {
    this.render = eidtor.renderEngine
    this.item = item
    this.repo = repo
  }

  public async execute() {
    await this.render.command('ADD_NODE', this.item)
    this.repo.save(this.item)

    return Promise.resolve()
  }

  public async undo() {
    await this.render.command('DEL_NODE', this.item)
    this.repo.destroy(this.item.id!)
    
    return Promise.resolve()
  }
}



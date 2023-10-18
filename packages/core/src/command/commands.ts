import { Engine, type ShapeT } from 'huajs-common'
import { PositionComponent } from 'huajs-repo'
import { useRepo, type Repository, type Item } from 'pinia-orm'
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
  declare shape: ShapeT | ShapeT[]
  repo: ReturnType<typeof useRepo>

  constructor(eidtor: Editor, repo: ReturnType<typeof useRepo>, shape: ShapeT | ShapeT[]) {
    this.render = eidtor.renderEngine
    this.shape =shape 
    this.repo = repo
  }

  public async execute() {
    // await this.render.command('ADD_NODE', this.shape)
    this.repo.save(this.shape)

    return Promise.resolve()
  }

  public async undo() {
    // await this.render.command('DEL_NODE', this.shape)
    const destroyArr = Array.isArray(this.shape) ? this.shape.map(sp => sp.id).filter(sp => !!sp) : [this.shape.id]
    this.repo.destroy(destroyArr)
    
    return Promise.resolve()
  }
}

export class ChangePositionCommand implements ICommand {
  render: Engine
  declare newPosition: Item<PositionComponent>
  declare oldPosition: Item<PositionComponent> | null
  repo: Repository<PositionComponent>

  constructor(eidtor: Editor, repo: Repository<PositionComponent>, newPosition: Item<PositionComponent>) {
    this.render = eidtor.renderEngine
    this.newPosition = newPosition 
    this.oldPosition = null
    this.repo = repo
  }

  public async execute() {
    const now = new Date().getTime()
    const posComp: Item<PositionComponent> = this.repo.where('id', this.newPosition?.id).first()
    const t1 = new Date().getTime()
    console.log(t1 - now)
    if(!posComp) return
    this.oldPosition = posComp
    this.repo.save({
      ...this.newPosition
    })
  const t2 = new Date().getTime()
    console.log(t2 - now)
    return Promise.resolve()
  }

  public async undo() {
    this.repo.save({
      ...this.oldPosition
    })
    return Promise.resolve()
  }
}



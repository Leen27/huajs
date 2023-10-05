import { World } from 'miniplex'
export class System {
  world: World

  constructor(world: World, ...initArgs: any[]) {
    this.world = world

    this.init(...initArgs)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  init(...initArgs: any) {}

  update() {}
}
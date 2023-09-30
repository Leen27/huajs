import { Component } from "./component"
import { world } from './world'

export class Entity {
  _entity: any
  constructor() {
    this._entity  = world.add({})
  }

  addComponent(comp: Component) {
    world.addComponent(this._entity, "velocity", comp)
  }
}
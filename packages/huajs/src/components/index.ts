import { Component } from "../core/component";

export class PosComponent extends Component {
  constructor() {
    super({
      key: 'position',
      data: {
        x: 0,
        y: 0,
        z: 0
      }
    })
  }
}
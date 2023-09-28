import { World } from 'miniplex'

type Entity = {
    position: { x: number, y: number, z: number}
}

const world = new World<Entity>()
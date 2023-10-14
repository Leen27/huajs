import mitt, { type Emitter } from 'mitt'

export const createEventBus = () => mitt()
export type EventBus = Emitter<any>

export enum eventType {
  DRAG_MOVE = 'dragmove',
  DRAG_END = 'dragend'
}
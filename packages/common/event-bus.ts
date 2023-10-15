import mitt, { type Emitter } from 'mitt'

export const createEventBus = () => mitt()
export type EventBus = Emitter<any>

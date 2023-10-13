import { Model } from 'pinia-orm'
import { Num, Str, Uid, HasOne } from 'pinia-orm/decorators'

export class PositionComponent extends Model {
  static entity = 'position-component'

  @Uid() declare id: string
  @Str('') declare entityId: string

  @Num(0) declare x: number
  @Num(0) declare y: number
}

export class SizeComponent extends Model {
  static entity = 'size-component'

  @Uid() declare id: string
  @Str('') declare entityId: string

  @Num(0) declare width: number
  @Num(0) declare height: number
}

export type ComponentT = PositionComponent | SizeComponent

export class Entity extends Model {
  static entity = 'entity'

  @Uid() declare id: string
  @HasOne(() => PositionComponent, 'entityId') declare position: PositionComponent
  @HasOne(() => SizeComponent, 'entityId') declare size: SizeComponent
}

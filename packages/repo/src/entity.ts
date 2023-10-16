import { Model } from 'pinia-orm'
import { Num, Str, Uid, HasOne, Bool } from 'pinia-orm/decorators'

export class ShapeInfoComponent extends Model {
  static entity = 'package-component'

  @Uid() declare id: string
  @Str('') declare entityId: string

  @Str('') declare shapeType: string
}

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
  @Num(0) declare radius: number
}

export type ComponentT = PositionComponent | SizeComponent

export class Entity extends Model {
  static entity = 'entity'

  @Uid() declare id: string
  @Bool(false) declare isSelected: boolean
  @HasOne(() => ShapeInfoComponent, 'entityId') declare shapeInfo: ShapeInfoComponent
  @HasOne(() => PositionComponent, 'entityId') declare position: PositionComponent
  @HasOne(() => SizeComponent, 'entityId') declare size: SizeComponent
}

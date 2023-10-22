import { Model } from 'pinia-orm'
import { Str, Uid, Attr, Cast, Bool } from 'pinia-orm/decorators'
import { ArrayCast } from 'pinia-orm/casts'

export class Entity extends Model {
  static entity = 'entity'

  @Uid() declare id: string

  @Cast(() => ArrayCast)
  @Attr('{}') declare position: { x: number, y: number }

  @Cast(() => ArrayCast)
  @Attr('{}') declare size: { width: number, height: number, radius: number }

  @Str('') declare shapeType: string

  @Bool(false) declare isSelected: boolean

}

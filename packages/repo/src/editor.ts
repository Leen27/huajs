import { Model } from "pinia-orm"
import { Num, Str, Uid, HasMany, BelongsTo, Bool } from 'pinia-orm/decorators'
import { Entity } from "."

export class Editor extends Model {
    static entity = 'editor'
  
    @Uid() declare id: string
    @Bool(false) declare selectedEntity: boolean
    @HasMany(() => Entity, 'entityId') declare entities: Entity[]
}
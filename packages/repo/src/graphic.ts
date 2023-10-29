import { Model } from "pinia-orm"
import { Str, Uid, HasMany } from 'pinia-orm/decorators'
import { Entity } from "./entity"

export class Graphic extends Model {
    static entity = 'graphic'
  
    @Uid() declare id: string
    @Str('') declare selectedEntityId: string
    @HasMany(() => Entity, 'entityId') declare entities: Entity[]
}

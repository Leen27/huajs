import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Model } from 'pinia-orm'
import { Attr, Num, Cast, Str, Uid, HasMany } from 'pinia-orm/decorators'

export class Component extends Model {
  static entity = 'component'

  @Uid() declare id: string
  @Str('') declare key: string
  @Str('') declare entityId: string

  @Num(0) declare x: number
  @Num(0) declare y: number

  @Num(0) declare width: number
  @Num(0) declare height: number
}

export class Entity extends Model {
  static entity = 'entity'

  @Uid() declare id: string
  @HasMany(() => Component, 'entityId') declare components: Component[]
}

export const useEntityStore = defineStore('layer', () => {
  const list = ref<any>([{ "position": { "x": 121.24491435095517, "y": 151.63091612853805 } }, { "position": { "x": 168.04221228469854, "y": 164.92300427382168 } }, { "position": { "x": 141.41420829337198, "y": 185.23658416439505 } }, { "position": { "x": 174.92374904894064, "y": 197.44879864300933 } }, { "position": { "x": 113.82342455172186, "y": 110.8661655101325 } }])
  
  function add(item: any) {
    list.value.push(item)
  }

  return { list, add }
})

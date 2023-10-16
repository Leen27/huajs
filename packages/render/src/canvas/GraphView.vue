<script setup lang="ts">
import { computed, ref } from 'vue'
import Konva from 'konva'
import { type EventBus } from 'huajs-common'
import Repos, { Entity, Graphic } from 'huajs-repo'

const props = defineProps<{eventBus: EventBus}>()

const configKonva = ref({
  width: 1000,
  height: 1000
})

const entityRepo = Repos.Entity()
const GraphicRepo = Repos.Graphic()
GraphicRepo.save({})
const nodes = computed(() => entityRepo.withAll().get())

const stageRef = ref<Konva.Stage | null>(null)
const stage = computed(() => stageRef.value?.getStage())

const handleEntityDragEnd = (evt: Konva.KonvaPointerEvent, item: any) => {
  if (!stage.value) return

  const mousePos = stage.value.getPointerPosition()
  if (!mousePos) return

  if (item.position) {
    item.position.x = evt.target.x()
    item.position.y = evt.target.y()
  }

  props.eventBus.emit(evt.type, item)
}

const handleEntityDragMove = (evt: Konva.KonvaPointerEvent, item: any) => {
  if (!stage.value) return

  const mousePos = stage.value.getPointerPosition()
  if (!mousePos) return

  props.eventBus.emit(evt.type, item)
}

const handleLayerClick = (evt: Konva.KonvaPointerEvent) => {
  const target = evt.target
  console.log(target, '#1')
  const entity = target.getAttr('entity')
  if (!entity || !(entity instanceof Entity)) {
    console.log('#1')
    GraphicRepo.save({
      id: GraphicRepo.query().first()?.id,
      selectedEntityId: ''
    })
    return
  }
     
  console.log(entity, '#2', GraphicRepo.query().first()?.selectedEntityId)
  GraphicRepo.save({
    id: GraphicRepo.query().first()?.id,
    selectedEntityId: entity.id
  })
}

</script>
<template>
  <v-stage :config="configKonva" ref="stageRef" @click="handleLayerClick">
    <v-layer>
      <template       
        v-for="(item) in nodes"
        :key="item.id"
      >
        <v-circle
          v-if="item.shapeInfo?.shapeType === 'Circle'"
          :config="{
            fill: 'red',
            draggable: true,
            x: item.position?.x,
            y: item.position?.y,
            radius: item.size?.radius,
            entity: item
          }"
          @dragmove="handleEntityDragMove($event, item)"
          @dragend="handleEntityDragEnd($event, item)"
        />
        <v-rect
          v-if="item.shapeInfo?.shapeType === 'Rect'"
          :config="{
            fill: 'red',
            draggable: true,
            x: item.position?.x,
            y: item.position?.y,
            width: item.size?.width,
            height: item.size?.height,
            entity: item
          }"
          @dragmove="handleEntityDragMove($event, item)"
          @dragend="handleEntityDragEnd($event, item)"
        />
      </template>
    </v-layer>
  </v-stage>
</template>
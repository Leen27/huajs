<script setup lang="ts">
import { computed, ref } from 'vue'
import Konva from 'konva'
import { type EventBus } from 'huajs-common'
import Repos, { Entity } from 'huajs-repo'

const props = defineProps<{eventBus: EventBus}>()

const configKonva = ref({
  width: 1000,
  height: 1000
})

const entityRepo = Repos.Entity()
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
  if (!entity || !(entity instanceof Entity)) return
  console.log(entity, '#2')
  entityRepo.where('id', entity.id).update({ isSelected: true })
}

</script>
<template>
    <div w-100 h-10 b-black b-1 bg-green absolute right-0 z-99  v-for="(item) in nodes" :key="item.id">
    <span>x: {{ item.position.x }}</span>
    <span>y: {{ item.position.y }}</span>
  </div>
  <v-stage :config="configKonva" ref="stageRef">
    <v-layer @click="handleLayerClick">
      <template       
        v-for="(item) in nodes"
        :key="item.id"
      >
        <v-circle
          v-if="item.shapeInfo?.shapeType === 'Circle'"
          :x="item.position?.x"
          :y="item.position?.y"
          :radius="item.size?.radius"
          :config="{
            fill: 'red',
            draggable: true
          }"
          :entity="item"
          @dragmove="handleEntityDragMove($event, item)"
          @dragend="handleEntityDragEnd($event, item)"
        />
        <v-rect
          v-if="item.shapeInfo?.shapeType === 'Rect'"
          :x="item.position?.x"
          :y="item.position?.y"
          :width="item.size?.width"
          :height="item.size?.height"
          :config="{
            fill: 'red',
            draggable: true
          }"
          :entity="item"
          @dragmove="handleEntityDragMove($event, item)"
          @dragend="handleEntityDragEnd($event, item)"
        />
      </template>
    </v-layer>
  </v-stage>
</template>
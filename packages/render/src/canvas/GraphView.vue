<script setup lang="ts">
import { computed, ref } from 'vue'
import Konva from 'konva'
import { useNodesStore } from '../store'
import { type EventBus, type ShapeT } from 'huajs-common';

const props = defineProps<{eventBus: EventBus}>()

const configKonva = ref({
  width: 1000,
  height: 1000
})

const itemStore = useNodesStore()

const stageRef = ref<Konva.Stage | null>(null)
const stage = computed(() => stageRef.value?.getStage())

const handleEntityDragEnd = (evt: Konva.KonvaPointerEvent, item: ShapeT) => {
  if (!stage.value) return

  const mousePos = stage.value.getPointerPosition()
  if (!mousePos) return

  if (item.position) {
    item.position.x = evt.target.x()
    item.position.y = evt.target.y()
  }

  props.eventBus.emit(evt.type, item)
}

const handleEntityDragMove = (evt: Konva.KonvaPointerEvent, item: ShapeT) => {
  if (!stage.value) return

  const mousePos = stage.value.getPointerPosition()
  if (!mousePos) return

  props.eventBus.emit(evt.type, item)
}

</script>
<template>
  <v-stage :config="configKonva" ref="stageRef">
    <v-layer>
      <template       
        v-for="(item) in itemStore.nodes"
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
          @dragmove="handleEntityDragMove($event, item)"
          @dragend="handleEntityDragEnd($event, item)"
        />
      </template>
    </v-layer>
  </v-stage>
</template>
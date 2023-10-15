<script setup lang="ts">
import { computed, ref } from 'vue'
import Konva from 'konva'
import { useNodesStore, type NodeT } from '../store'
import { type EventBus } from 'huajs-common';

const props = defineProps<{eventBus: EventBus}>()

const configKonva = ref({
  width: 1000,
  height: 1000
})

const itemStore = useNodesStore()

const stageRef = ref<Konva.Stage | null>(null)
const stage = computed(() => stageRef.value?.getStage())

const handleEntityDragEnd = (evt: Konva.KonvaPointerEvent, item: NodeT) => {
  if (!stage.value) return

  const mousePos = stage.value.getPointerPosition()
  if (!mousePos) return

  item.position.x = evt.target.x()
  item.position.y = evt.target.y()

  props.eventBus.emit(evt.type, item)
}

const handleEntityDragMove = (evt: Konva.KonvaPointerEvent, item: NodeT) => {
  if (!stage.value) return

  const mousePos = stage.value.getPointerPosition()
  if (!mousePos) return

  props.eventBus.emit(evt.type, item)
}

</script>
<template>
  <div w-100 h-10 b-black b-1 bg-green absolute right-0 z-99  v-for="(item) in itemStore.nodes" :key="item.id">
    <span>x: {{ item.position.x }}</span>
    <span>y: {{ item.position.y }}</span>
  </div>
  <v-stage :config="configKonva" ref="stageRef">
    <v-layer>
      <v-circle
        v-for="(item) in itemStore.nodes"
        :key="item.id"
        :x="item.position.x" :y="item.position.y"
        :config="{
          radius: 70,
          fill: 'red',
          draggable: true
        }"
        @dragmove="handleEntityDragMove($event, item)"
        @dragend="handleEntityDragEnd($event, item)"
      />
    </v-layer>
  </v-stage>
</template>
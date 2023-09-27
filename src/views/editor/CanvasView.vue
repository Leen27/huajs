<template>
    <v-stage :config="configKonva" ref="stageRef" @mousedown="stage.touchStart" @mouseMove="stage.touchMove">
        <v-layer>
          <v-rect :config="configSelectionRectangle" :visible="pressed" />
          <v-circle :config="configCircle"></v-circle>
          <v-rect :config="configRect"></v-rect>
        </v-layer>
    </v-stage>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useMousePressed } from '@vueuse/core'

const configKonva = ref({
  width: 900,
  height: 900
})
const configCircle = ref({
  x: 100,
  y: 100,
  radius: 70,
  fill: "red",
  stroke: "black",
  strokeWidth: 4
})

const configRect = ref({
  x: 60,
  y: 60,
  width: 100,
  height: 90,
  fill: 'red',
  name: 'rect',
  draggable: true,
})

const configSelectionRectangle = ref({
  fill: 'rgba(0,0,255,0.5)',
  visible: false,
  width: 0,
  height: 0,
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0
})

const stageRef = ref(null)
const { pressed } = useMousePressed({ target: stageRef })
const stage = {
  touchStart: (e: MouseEvent) => {
    console.log(e, '#1')
    if (e.target !== stageRef.value) return

    // e.evt.preventDefault()
    configSelectionRectangle.value.visible = true
    configSelectionRectangle.value.width = 0
    configSelectionRectangle.value.height = 0
  },
  touchMove: (e: MouseEvent) => {
    console.log(e, '#2')
  }
}
</script>
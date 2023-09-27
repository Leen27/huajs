<template>
  <v-stage
    :config="configKonva"
    @mousedown="stage.touchStart"
    @mouseMove="stage.touchMove"
    @mouseUp="stage.touchEnd"
    @touchStart="stage.touchStart"
    @touchMove="stage.touchMove"
    @touchEnd="stage.touchMove"
  >
    <v-layer>
      <v-rect :config="configSelectionRectangle" ref="SelectionRectangle" />
      <v-transformer ref="transformer" />
      <v-circle :config="configCircle"></v-circle>
      <v-rect :config="configRect"></v-rect>
    </v-layer>
  </v-stage>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Konva from 'konva'

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
  x: 0,
  y: 0,
  fill: 'rgba(0,0,255,0.5)',
  visible: false,
  width: 0,
  height: 0,
})

const transformer = ref<null | any>(null)
const SelectionRectangle = ref<null | any>(null)

let x1 = 0, y1 = 0, x2 = 0, y2 = 0

const stage = {
  touchStart: (e: Konva.KonvaPointerEvent) => {
    const _stage = (e.target as Konva.Node)?.getStage()

    if (!_stage || (e.target !== _stage)) return

    e.evt.preventDefault()

    const pos = _stage.getPointerPosition()

    if (!pos) return

    const { x, y } = pos

    x1 = x
    y1 = y
    x2 = x
    y2 = y

    configSelectionRectangle.value.visible = true
    configSelectionRectangle.value.width = 0
    configSelectionRectangle.value.height = 0
  },
  touchMove: (e: Konva.KonvaPointerEvent) => {
    const _stage = e.target.getStage()
    
    // do nothing if we didn't start selection
    if (!_stage || !configSelectionRectangle.value.visible) return

    e.evt.preventDefault();

    const pos = _stage.getPointerPosition()

    if (!pos) return

    const { x, y } = pos

    x2 = x
    y2 = y

    configSelectionRectangle.value = {
      ...configSelectionRectangle.value,
      x: Math.min(x1, x2),
      y: Math.min(y1, y2),
      width: Math.abs(x2 - x1),
      height: Math.abs(y2 - y1),
    }
  },
  touchEnd: (e: Konva.KonvaPointerEvent) => {
    const _stage = e.target.getStage()

    // do nothing if we didn't start selection
    if (!_stage || !configSelectionRectangle.value.visible) return

    e.evt.preventDefault()

    // update visibility in timeout, so we can check it in click event
    setTimeout(() => {
      configSelectionRectangle.value.visible = false
    });

    var shapes = _stage.find('.rect')

    var box = SelectionRectangle.value?.getNode().getClientRect()

    var selected = shapes.filter((shape) =>
      box && Konva.Util.haveIntersection(box, shape.getClientRect())
    )

    const transformerNode = transformer.value?.getNode()
    transformerNode.nodes(selected);
  }
}
</script>
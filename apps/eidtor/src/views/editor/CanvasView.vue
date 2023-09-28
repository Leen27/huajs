<template>
  <v-stage
    :config="configKonva"
    @mousedown="stage.touchStart"
    @mouseMove="stage.touchMove"
    @mouseUp="stage.touchEnd"
    @click="stage.click"
  >
    <v-layer>
      <v-rect :config="configSelectionRectangle" ref="SelectionRectangle" />
      <v-transformer ref="transformer" :shouldOverdrawWholeArea="true" />
      <v-circle :config="configCircle"></v-circle>
      <v-rect :config="configRect"></v-rect>
      <v-rect :config="configRect2"></v-rect>
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

const configRect2 = ref({
  x: 250,
  y: 100,
  width: 150,
  height: 90,
  fill: 'green',
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
    transformerNode.nodes(selected)
  },
  click(e: Konva.KonvaPointerEvent) {
    console.log(e, '#1')
    // if we are selecting with rect, do nothing
    if (configSelectionRectangle.value.visible) return

    const _stage = e.target.getStage()
    const transformerNode = transformer.value?.getNode()

    // if click on empty area - remove all selections
    if (e.target === _stage) {
      transformerNode.nodes([])
      return;
    }

    // do nothing if clicked NOT on our rectangles
    if (!e.target.hasName('rect')) return

    // do we pressed shift or ctrl?
    const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
    const isSelected = transformerNode.nodes().indexOf(e.target) >= 0;

    if (!metaPressed && !isSelected) {
      // if no key pressed and the node is not selected
      // select just one
      transformerNode.nodes([e.target]);
    } else if (metaPressed && isSelected) {
      // if we pressed keys and node was selected
      // we need to remove it from selection:
      const nodes = transformerNode.nodes().slice(); // use slice to have new copy of array
      // remove node from array
      nodes.splice(nodes.indexOf(e.target), 1);
      transformerNode.nodes(nodes);
    } else if (metaPressed && !isSelected) {
      // add the node into selection
      const nodes = transformerNode.nodes().concat([e.target]);
      transformerNode.nodes(nodes);
    }
  }
}
</script>
<template>
  <div w-full bg-light>
    <div w-100 h-10 b-black b-1 bg-white absolute z-99>
        <o-button @click="addShape">+</o-button>
        <div>
          {{ items }}
        </div>
    </div>
    <div id="container"></div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import Editor from '@/core/editor'
import { useLayerStore } from '@/stores/layer'
let editor: Editor | undefined;

const { list: items } = useLayerStore()

console.log(items, items[0], '#2')
onMounted(() => {
  editor = new Editor('container', { layers: [{ items}]})
})

const addShape = () => {
  editor?.command('AddShapeCommand')
}
</script>

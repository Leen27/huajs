<template>
  <div w-full bg-light>
    <div w-100 h-10 b-black b-1 bg-white absolute z-99>
        <o-button @click="addShape">+</o-button>
        <o-button @click="undo">undo</o-button>
        <div>
          {{ list }}
        </div>
    </div>
    <div w-full h-screen id="container"></div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import Editor from '@/core/editor'
import { useEntityStore } from '@/stores/entity'
let editor: Editor | undefined;

const { list } = useEntityStore()

onMounted(() => {
  editor = new Editor({ id: 'container' })
  editor.renderEngine.on('item:move', (...args) => { console.log(args) })
})

const addShape = async () => {
  const item = {
      position: {
        x: 400 + Math.random() * 100,
        y: 100 + Math.random() * 100
      }
    }
  await editor?.renderEngine.command('AddShapeCommand', item)
  list.push(item)
}

const undo = async () => {
  await editor?.renderEngine.undo()
}
</script>

<template>
  <div w-full bg-light>
    <div w-100 h-10 b-black b-1 bg-white absolute z-99>
        <o-button @click="addShape">+</o-button>
        <o-button @click="undo">undo</o-button>
        <div>
          {{ entities }}
        </div>
    </div>
    <div w-full h-screen id="container"></div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue'
import Editor from '@/core/editor'
import { Entity } from '@/stores/entity'
import { useRepo } from 'pinia-orm';
let editor: Editor | undefined;

const entityRepo = useRepo(Entity)
const entities = computed(() => entityRepo.all())

onMounted(() => {
  editor = new Editor({ id: 'container' })
  editor.renderEngine.on('item:move', (...args) => { console.log(args) })
})

const addShape = async () => {
  const item = {
    position: {
      x: 500 + Math.random() * 100,
      y: 100 + Math.random() * 100
    },
    size: {
      width: 100,
      height: 100
    }
  }

  const res = await editor?.renderEngine.command('AddShapeCommand', item)
  const entity = entityRepo.save(item)
  console.log(entity, res)
  window.$entity = entity
}

const undo = async () => {
  await editor?.renderEngine.undo()
}
</script>

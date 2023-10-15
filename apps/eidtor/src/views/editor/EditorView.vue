<template>
  <div w-full bg-light>
    <div w-100 h-10 b-black b-1 bg-white absolute z-99>
        <o-button @click="addShape">+</o-button>
        <o-button @click="addCircle">+ circle</o-button>
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
import Editor from 'huajs-core'
import { Entity } from '@/models/entity'
import { useRepo } from 'pinia-orm';
let editor: Editor | undefined;

const entityRepo = useRepo(Entity)
const entities = computed(() => entityRepo.all())

onMounted(() => {
  editor = new Editor({ id: 'container' })
  editor.on('render:dragend', (data: any) => {
    entityRepo.save(data)
  })
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

  await editor?.command('AddShapeCommand', entityRepo, item)
}

const addCircle = async () => {
  const item = {
    shapeInfo: {
      shapeType: 'Circle',
    },
    position: {
      x: 500 + Math.random() * 100,
      y: 100 + Math.random() * 100 
    },
    size: {
      radius: 70
    }
  }

  await editor?.command('AddShapeCommand', entityRepo, item)
}

const undo = async () => {
  await editor?.undo()
}
</script>

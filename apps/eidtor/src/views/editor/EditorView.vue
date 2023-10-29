<template>
  <div w-full bg-light>
    <div w-100 h-10 b-black b-1 bg-white absolute z-99>
      #{{ loading }}
        <o-button @click="addShape">+</o-button>
        <o-button @click="addCircle">+ circle1</o-button>
        <o-button @click="addRect">+ rect</o-button>
        <o-button @click="create100">+ create100</o-button>
        <o-button @click="undo">undo</o-button>
        <o-button @click="save">save</o-button>
        <div>
          {{ entities }}
        </div>
    </div>
    <div w-full h-screen id="container"></div>
    <div w-100 h-screen bg-coolGray absolute right-0 top-0>
      {{graphicData}}
      <div>
      {{ entityConfig }}
    </div>
    </div>
   
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import Editor from 'huajs-core'
import Repos from 'huajs-repo'
let editor: Editor | undefined;

const graphicRepo = Repos.graphic()
const entityRepo = Repos.entity()
const entities = computed(() => entityRepo.withAll().get())
const graphicData = computed(() => graphicRepo.query().first())
const entityConfig = computed(() => entityRepo.where('id', graphicData.value?.selectedEntityId).get())

const loading = ref('')

onMounted(() => {
  editor = new Editor({ id: 'container' })
})

const create100 = async () => {
  const arr: any = []
  for(let i = 0; i< 5000; i++) {
    arr.push({
      shapeType: 'Circle',
      position: {
        x: 500 + Math.random() * 100,
        y: 100 + Math.random() * 100 
      },
      size: {
        radius: 70
      }
    })
  }
  loading.value = 'loading'
  setTimeout(async () => {
    entityRepo.save(arr)
    loading.value = 'success'
  })
}

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
console.log(editor, editor?.command, '@')
  await editor?.command('AddShape', entityRepo, item)
}

const addCircle = async () => {
  const item = {
    shapeType: 'Circle',
    position: {
      x: 500 + Math.random() * 100,
      y: 100 + Math.random() * 100 
    },
    size: {
      radius: 70
    }
  }
  console.log(editor, editor?.command, '@')
  await editor?.command('AddShape', entityRepo, item)
}

const addRect = async () => {
  const item = {
    shapeType: 'Rect',
    position: {
      x: 500 + Math.random() * 100,
      y: 100 + Math.random() * 100 
    },
    size: {
      width: 300,
      height: 300
    }
  }

  await editor?.command('AddShape', entityRepo, item)
}

const undo = async () => {
  await editor?.undo()
}

const save = async () => {
  await editor?.command('SaveData', entityRepo)
}
</script>

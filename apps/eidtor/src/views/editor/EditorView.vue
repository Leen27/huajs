<template>
  <div w-full bg-light>
    <div w-100 h-10 b-black b-1 bg-white absolute z-99>
      #{{ loading }}
        <o-button @click="addShape">+</o-button>
        <o-button @click="addCircle">+ circle</o-button>
        <o-button @click="addRect">+ rect</o-button>
        <o-button @click="create100">+ create100</o-button>
        <o-button @click="undo">undo</o-button>
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

const graphicRepo = Repos.Graphic()
const entityRepo = Repos.Entity()
const entities = computed(() => entityRepo.withAll().get())
const graphicData = computed(() => graphicRepo.query().first())
const entityConfig = computed(() => entityRepo.with('position').where('id', graphicData.value?.selectedEntityId).get())

const loading = ref('')

onMounted(() => {
  editor = new Editor({ id: 'container' })
})

const create100 = async () => {
  const arr = []
  for(let i = 0; i< 500; i++) {
    arr.push({
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
    })
  }
  loading.value = 'loading'
  setTimeout(async () => {
    // await editor?.command('AddShapeCommand', entityRepo, arr)
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

const addRect = async () => {
  const item = {
    shapeInfo: {
      shapeType: 'Rect',
    },
    position: {
      x: 500 + Math.random() * 100,
      y: 100 + Math.random() * 100 
    },
    size: {
      width: 300,
      height: 300
    }
  }

  await editor?.command('AddShapeCommand', entityRepo, item)
}

const undo = async () => {
  await editor?.undo()
}
</script>

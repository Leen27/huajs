<template>
  <div w-full bg-light>
    <div w-100 h-10 b-black b-1 bg-white absolute z-99>
        <o-button @click="addShape">+</o-button>
    </div>
    <div id="container"></div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import Editor from '@/core/editor'

let editor: Editor | undefined;

onMounted(() => {
  editor = new Editor('container')
})

const addShape = () => {
  editor?.command('AddShapeCommand')
}
</script>

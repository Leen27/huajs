<template>
  <div w-full bg-light>
    <div w-100 h-10 b-black b-1 bg-white absolute z-99>
        <o-button @click="ui.addShape">+</o-button>
    </div>
    <div id="container"></div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import GraphEngine from 'huajs-core'
onMounted(() => {
  new GraphEngine({ id: 'container' })
})

const ui = {
    addShape() {

    }
}
</script>

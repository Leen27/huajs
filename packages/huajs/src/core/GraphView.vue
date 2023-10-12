<script setup lang="ts">
import { ref } from 'vue'
import { useItemsStore } from '../store'

const configKonva = ref({
  width: 1000,
  height: 1000
})

const itemStore = useItemsStore()

const configCircle = ref({
  radius: 70,
  fill: "red",
  stroke: "black",
  strokeWidth: 4
})
</script>
<template>
  <v-stage :config="configKonva">
    <v-layer>
      <v-circle v-for="(item, index) in itemStore.items" :key="index" :x="item.position.x" :y="item.position.y"
        :config="configCircle"></v-circle>
    </v-layer>
  </v-stage>
</template>
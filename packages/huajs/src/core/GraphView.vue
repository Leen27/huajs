<script setup lang="ts">
import { ref } from 'vue'
const configKonva = ref({
  width: 200,
  height: 200
})
const configCircle = ref({
  x: 100,
  y: 100,
  radius: 70,
  fill: "red",
  stroke: "black",
  strokeWidth: 4
})
</script>
<template>123
  <v-stage :config="configKonva">
    <v-layer>
      <v-circle :config="configCircle"></v-circle>
    </v-layer>
  </v-stage>
</template>
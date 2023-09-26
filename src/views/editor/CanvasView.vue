<template>
    <v-stage :config="configKonva">
        <v-layer>
        <v-circle :config="configCircle"></v-circle>
        <v-rect :config="configRect"></v-rect>
        </v-layer>
    </v-stage>
</template>
<script setup>
import { ref } from 'vue'

const configKonva = ref({
  width: 900,
  height: 900
})
const configCircle = ref({
  x: 100,
  y: 100,
  radius: 70,
  fill: "red",
  stroke: "black",
  strokeWidth: 4
})

const configRect = ref({
  x: 60,
  y: 60,
  width: 100,
  height: 90,
  fill: 'red',
  name: 'rect',
  draggable: true,
})

  </script>
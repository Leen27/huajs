<template>
    <div w-full bg-fuchsia inline-grid gap-4 grid-cols-3>
        <div class="text-green-800">components</div>
        <CanvasView />
        <div class="text-green-800">config</div>
    </div>
</template>
<script setup lang="ts">
import CanvasView from './CanvasView.vue'
</script>

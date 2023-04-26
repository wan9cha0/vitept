<template>
  <router-view v-if="isRouterAlive" />
</template>

<script setup>
import { nextTick, provide, ref } from 'vue'

let isRouterAlive = ref(true)
let reload = () => {
  isRouterAlive.value = false;
  nextTick(() => {
    isRouterAlive.value = true
  })
}

provide('reload', reload)
</script>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

<template>
  <div class="page">
    <div class="btn" @click="reload">点击刷新</div>
  </div>
</template>

<script setup>
import { inject, nextTick, provide, ref } from 'vue'

const reload = inject('reload')
</script>

<style lang="less" scoped>
.page {
  width: 100%;
  min-height: 100vh;
}
</style>
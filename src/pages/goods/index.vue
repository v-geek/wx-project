<template>
  <view>
    <canvas-poster ref="sharePosterRef" />
  </view>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, unref } from 'vue'
import canvasPoster from '@/components/shareModal/index.vue'

const sharePosterRef = ref()

onMounted(() => {
  unref(sharePosterRef).getPoster()
})
</script>

<style scoped></style>

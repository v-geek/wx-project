<template>
  <view>
    <web-view :src="url" />
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const url = ref('')

onLoad(params => {
  url.value = decodeURIComponent(params.url)
})
</script>

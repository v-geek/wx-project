<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />

    <view class="m-1">
      <text>111</text>
      <view class="i-ep-help"></view>
    </view>

    <view class="flex-c">222</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useUserStore from '@/store/modules/user'

console.log('xxxxx', useUserStore().userInfo)

const title = ref('Hello')
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}
</style>

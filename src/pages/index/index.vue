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
import { testGet1, testPost1 } from '@/api/modules/test'

console.log('测试store中的数据', useUserStore().userInfo)

getData()

async function getData() {
  try {
    const res1 = await testGet1()
    const res2 = await testPost1()
    console.log('get请求成功', res1)
    console.log('post请求成功', res2)
  } catch (err) {
    console.log('请求失败', err)
  }
}
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

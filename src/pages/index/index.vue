<template>
  <view>
    <view class="w-">111</view>
    <view class="w-">222</view>
    <view class="w-">333</view>
    <view class="w-">xxx</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import useUserStore from '@/store/modules/user'
import { testGet1, testPost1 } from '@/api/modules/test'
import router from '@/router'
import useModalStore from '@/store/modules/modal'

const userStore = useUserStore()
const modalStore = useModalStore()

userStore.setUseId('855555')
modalStore.setAuth('modal-auth')

onLoad(() => {
  getData()
})

// router.go('/pages/goods/index')

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

<style></style>

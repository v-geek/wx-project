<template>
  <view>
    <button open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
      <image class="avatar" :src="avatarUrl"></image>
    </button>
    <input type="nickname" placeholder="请输入昵称" v-model="nickName" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useUserStore from '@/store/modules/user'
import { testGet1, testPost1 } from '@/api/modules/test'
import { uniapp } from '@/utils/uni'

console.log('测试store中的数据', useUserStore().userInfo)

// getData()

// async function getData() {
//   try {
//     const res1 = await testGet1()
//     const res2 = await testPost1()
//     console.log('get请求成功', res1)
//     console.log('post请求成功', res2)
//   } catch (err) {
//     console.log('请求失败', err)
//   }
// }

const nickName = ref('')

const avatarUrl = ref(
  'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
)

const onChooseAvatar = (event: any) => {
  console.log('event', event)
  avatarUrl.value = event?.detail?.avatarUrl
}
</script>

<style></style>

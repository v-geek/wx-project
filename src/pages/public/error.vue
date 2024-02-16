<template>
  <view>
    <empty
      icon="/static/empty/internet-empty.png"
      text="网络连接失败"
      showButton
      buttonText="重新连接"
      @btnClick="onReconnect"
      v-if="errCode === 'networkError'"
    />

    <empty
      v-else
      icon="/static/empty/internet-empty.png"
      :text="errMsg"
      showButton
      buttonText="重新加载"
      @btnClick="onReconnect"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import empty from '@/components/empty.vue'

const errCode = ref('')
const errMsg = ref('')

onLoad(params => {
  errCode.value = params?.errCode || ''
  errMsg.value = params?.errMsg || ''
})

// 重新连接
async function onReconnect() {
  uni.reLaunch({
    url: '/pages/index/index'
  })
  // ShoproInit()
}
</script>

<style scoped></style>

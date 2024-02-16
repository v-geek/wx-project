<template>
  <view class="flex-c flex-col w-full" :style="{ paddingTop: paddingTop + 'rpx' }">
    <image class="w-240" :src="icon" mode="widthFix" />
    <view class="empty-text mt-28 mb-40">
      <text v-if="text !== ''">{{ text }}</text>
    </view>
    <button class="reset-button empty-btn" v-if="showButton" @tap="btnClick">
      {{ buttonText }}
    </button>
  </view>
</template>

<script lang="ts" setup>
import router from '@/router'

const props = defineProps({
  paddingTop: {
    type: String,
    default: '260'
  },
  icon: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  },
  showButton: {
    type: Boolean,
    default: false
  },
  buttonText: {
    type: String,
    default: ''
  },
  buttonColor: {
    type: String,
    default: '#ff3000'
  },
  buttonUrl: {
    type: String,
    default: ''
  }
})

const emits = defineEmits(['btnClick'])

function btnClick() {
  if (props.buttonUrl !== '') {
    router.go(props.buttonUrl)
  }
  emits('btnClick')
}
</script>

<style lang="scss" scoped>
.w-240 {
  width: 240rpx;
}

.empty-text {
  font-size: 26rpx;
  font-weight: 500;
  color: #999999;
}

.mt-28 {
  margin-top: 28rpx;
}

.mb-40 {
  margin-bottom: 40rpx;
}

.empty-btn {
  width: 320rpx;
  height: 70rpx;
  border: 2rpx solid v-bind('buttonColor');
  border-radius: 35rpx;
  font-weight: 500;
  color: v-bind('buttonColor');
  font-size: 28rpx;
}
</style>

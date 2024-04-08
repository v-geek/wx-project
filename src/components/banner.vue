<template>
  <view class="swiper-box">
    <swiper
      :current="current"
      :interval="3000"
      :duration="500"
      :circular="true"
      :style="{ height: swiperHeight + 'rpx' }"
      @change="onChange"
      autoplay
    >
      <swiper-item v-for="(url, index) in urlList" :key="url">
        <picture :src="url" @click="onClick(index)" />
      </swiper-item>
    </swiper>

    <template v-if="showNavigation && urlList.length">
      <view class="arrow" @tap="slidePrev" :style="{ left: '30rpx' }">
        <uni-icons type="left" size="14" color="#ffffff" />
      </view>

      <view class="arrow" @tap="slideNext" :style="{ right: '30rpx' }">
        <uni-icons type="right" size="14" color="#ffffff" />
      </view>
    </template>
  </view>
</template>

<script setup lang="ts">
import { ref, watch, type PropType } from 'vue'
import picture from './picture.vue'

const props = defineProps({
  urlList: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  showNavigation: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const current = ref(0)
const swiperHeight = ref(300)

// swiper的Bug: 高度自适应时, 最高为 300rpx
// 因此需要手动设置高度, 否则图片显示不完全
watch(
  () => props.urlList,
  newVal => {
    if (!newVal?.length) return

    uni.getImageInfo({
      src: newVal[0],
      success: res => {
        swiperHeight.value = (750 / res.width) * res.height
      },
      fail: (err: any) => {
        console.log('err', err)
      }
    })
  },
  {
    immediate: true,
    deep: true
  }
)

const onChange = (e: { detail: { current: number } }) => {
  current.value = e.detail.current
}

const slidePrev = () => {
  const lastIndex = props.urlList.length - 1

  if (current.value === 0) {
    current.value = lastIndex
  } else {
    current.value -= 1
  }
}

const slideNext = () => {
  const lastIndex = props.urlList.length - 1

  if (current.value === lastIndex) {
    current.value = 0
  } else {
    current.value += 1
  }
}

const onClick = (index: number) => {
  emit('click', index)
}
</script>

<style lang="scss" scoped>
.swiper-box {
  position: relative;
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 50%;
  background-color: rgba(31, 45, 61, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30rpx;
  width: 56rpx;
  height: 56rpx;
  z-index: 130;
}

.download-btn {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 120;
  width: 460rpx;
  background-color: #409eff;
  height: 58rpx;
  border-radius: 24rpx;
}
</style>

<template>
  <view>
    <view class="flex-c">
      <image
        class="poster-img"
        :src="poster.src"
        :style="{
          width: poster.width + 'px',
          height: poster.height + 'px'
        }"
        :show-menu-by-longpress="true"
      ></image>
    </view>

    <canvas
      class="hideCanvas"
      :id="poster.canvasId"
      :canvas-id="poster.canvasId"
      :style="{
        width: poster.width + 'px',
        height: poster.height + 'px'
      }"
    />

    <view class="flex p-4">
      <view @tap="onSavePoster">保存</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { showToast } from '@/utils/uni'
import { getCurrentInstance, reactive } from 'vue'
import useCanvas from './utils/useCanvas'

const emits = defineEmits(['close'])
const vm = getCurrentInstance()

const poster = reactive({
  canvasId: 'canvasId',
  width: uni.getSystemInfoSync().windowWidth! * 0.9,
  height: 600,
  src: '',
  shareInfo: {
    type: 'goods',
    goods_bg: 'https://file.sheepjs.com/static/img/shop/config/goods-poster-bg.png',
    avatarUrl: 'https://file.sheepjs.com/static/img/default_avatar.png',
    title: '猫人男士睡衣男夏季100%纯棉薄款圆领套头短袖套装男ins潮休闲运动可外穿家居服',
    goodsImage: 'http://file.sheepjs.com/storage/test/20220822/8f232befa2dcbabb6ce69e7faa7d4df1.jpg',
    price: '99.00',
    original_price: 150,
    link: 'https://www.baidu.com/'
  }
})

const onClosePoster = () => {
  emits('close')
}

const onSavePoster = () => {
  // if (['WechatOfficialAccount', 'H5'].includes(sheep.$platform.name)) {
  //   console.log('请长按图片保存')
  //   return
  // }

  uni.saveImageToPhotosAlbum({
    filePath: poster.src,
    success: (res: any) => {
      onClosePoster()
      showToast('保存成功')
    },
    fail: (err: any) => {
      showToast('保存失败')
      console.log('图片保存失败:', err)
    }
  })
}

// 给Poster数据赋值
async function getPoster(params: Recordable) {
  poster.src = ''

  // #ifdef APP-PLUS
  poster.canvasId = 'canvasId-' + new Date().getTime()
  // #endif

  const data = await useCanvas(poster, vm)

  return data
}

defineExpose({
  getPoster
})
</script>

<style scoped>
.poster-img {
  border-radius: 20rpx;
}

.hideCanvas {
  position: fixed;
  top: -99999rpx;
  left: -99999rpx;
  z-index: -99999;
}
</style>

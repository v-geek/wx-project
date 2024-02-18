<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { initSystem } from './init'

onLaunch(() => {
  console.log('App Launch')
  uni.hideTabBar()
  initSystem()
})

onShow(() => {
  console.log('App Show')
})

onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">
// @import '@/styles/index.scss';
</style>

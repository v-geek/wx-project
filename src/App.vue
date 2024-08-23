<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import useSystemStore from './store/modules/system'
import { checkUpdate } from './utils/checkUpdate'

onLaunch(() => {
  console.log('App Launch')

  const systemStore = useSystemStore()

  systemStore.checkNetwork()

  const { screenHeight, safeArea } = uni.getSystemInfoSync()
  const safeAreaHeight = screenHeight! - safeArea!.bottom!
  systemStore.setState('safeAreaHeight', safeAreaHeight)

  uni.hideTabBar()

  checkUpdate()

  // #ifdef H5
  if (process.env.NODE_ENV === 'development') {
    import('vconsole').then(vconsole => {
      new vconsole.default()
    })
  }
  // #endif
})

onShow(() => {
  console.log('App Show')
})

onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">
@import '@/styles/index.scss';
</style>

<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'

onLaunch(() => {
  console.log('App Launch')

  console.log('zzzzzzzzz')

  console.log(ROUTES)
  console.log(ROUTES_MAP)
  console.log(TABBAR)
})

onShow(() => {
  console.log('App Show')
})

onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss"></style>

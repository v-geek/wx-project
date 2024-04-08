<template>
  <view :style="{ height: statusBarHeight }" class="status-bar">
    <slot />
  </view>
</template>

<script lang="ts" setup>
const statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px'
</script>

<style lang="scss">
.status-bar {
  height: var(--status-bar-height);
}
</style>

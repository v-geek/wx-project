<template>
  <image
    :src="url"
    :mode="mode"
    @tap="onImgPreview"
    @load="onImgLoad"
    @error="onImgError"
    class="img"
  />
</template>

<script setup lang="ts">
import { ref, type PropType } from 'vue'

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  mode: {
    type: String,
    default: 'widthFix'
  },
  isPreview: {
    type: Boolean,
    default: false
  },
  previewList: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  current: {
    type: Number,
    default: 0
  },
  errorSrc: {
    type: String,
    default: '/static/img_error.png'
  }
})

const emit = defineEmits(['load', 'error', 'click'])

const url = ref(props.src)

const onImgLoad = (e: any) => {
  emit('load')
}

const onImgError = (e: any) => {
  emit('error')
  url.value = props.errorSrc
}

const onImgPreview = () => {
  emit('click')

  if (!props.isPreview) return

  uni.previewImage({
    urls: props.previewList?.length ? props.previewList : [props.src],
    current: props.current
  })
}
</script>

<style lang="scss" scoped>
.img {
  position: relative;
  width: 100%;
  height: 100%;
  display: inline-block;
}
</style>

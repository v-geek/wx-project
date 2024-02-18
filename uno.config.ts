import { defineConfig, presetAttributify, presetUno, presetIcons } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'
import transformerVariantGroup from '@unocss/transformer-variant-group'

const remRE = /^-?[\.\d]+rem$/

export default defineConfig({
  presets: [
    presetAttributify(),
    presetUno(),
    presetRemToPx(),
    presetIcons({
      collections: {
        ep: () => import('@iconify-json/ep/icons.json').then(i => i.default)
      }
    })
  ],
  theme: {
    // 解决小程序不支持*选择器  将*替换为 page
    // eg: ERR: wxss GetCompiledResult: ./app.wxss(1:2): unexpected token `*`
    preflightRoot: ['page,::before,::after']
  },
  shortcuts: {
    'flex-c': 'flex justify-center items-center',
    'flex-between': 'flex justify-between items-center',
    'flex-end': 'flex justify-end items-center',
    'flex-column': 'flex flex-col'
  },
  transformers: [transformerVariantGroup()],
  postprocess(util) {
    // 自定义rem 转 rpx
    util.entries.forEach(i => {
      const value = i[1]
      if (value && typeof value === 'string' && remRE.test(value))
        i[1] = `${Number(value.slice(0, -3)) * 16 * 2}rpx`
    })
  }
})

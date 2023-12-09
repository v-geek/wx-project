import { defineConfig, presetAttributify, presetUno, presetIcons } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'
import transformerVariantGroup from '@unocss/transformer-variant-group'

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
    'flex-end': 'flex justify-end items-center'
  },
  transformers: [transformerVariantGroup()]
})

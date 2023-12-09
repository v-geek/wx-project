import { defineConfig, presetAttributify, presetUno } from 'unocss'

export default defineConfig({
  presets: [presetAttributify(), presetUno()],
  theme: {
    // 避免 * 通配符选择器 启动失败 将 * 替换为 page, uniapp不支持通配符选择器
    // eg: ERR: wxss GetCompiledResult: ./app.wxss(1:2): unexpected token `*`
    preflightRoot: ['page,::before,::after']
  }
})

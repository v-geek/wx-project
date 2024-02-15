import type { ComponentInternalInstance } from 'vue'
import QSCanvas from 'qs-canvas'
import { getPosterData } from './posterData/index'

export default async function useCanvas(options: Recordable, vm: ComponentInternalInstance | null) {
  const { width, height, canvasId } = options

  const qsc = new QSCanvas(
    {
      canvasId,
      width,
      height,
      setCanvasWH: (canvas: Recordable) => {
        options.height = canvas.height
      }
    },
    vm
  )

  const { bgUrl, list } = getPosterData(options) as any

  // 绘制背景图
  const background = await qsc.drawImg({
    type: 'image',
    val: bgUrl,
    x: 0,
    y: 0,
    width,
    mode: 'widthFix',
    zIndex: 0
  })

  await qsc.updateCanvasWH({
    width: background.width,
    height: background.height
  })

  for (let i = 0; i < list.length; i++) {
    const item = list[i]

    // 绘制文字
    if (item.type === 'text') {
      await qsc.drawText(item)
    }

    // 绘制图片
    if (item.type === 'image') {
      if (item.d) {
        qsc.setCircle({
          x: item.x,
          y: item.y,
          d: item.d,
          clip: true
        })
      }

      if (item.r) {
        qsc.setRect({
          x: item.x,
          y: item.y,
          height: item.height,
          width: item.width,
          r: item.r,
          clip: true
        })
      }

      await qsc.drawImg(item)

      qsc.restore()
    }

    // 绘制二维码
    if (item.type === 'qrcode') {
      await qsc.drawQrCode(item)
    }
  }

  await qsc.draw()

  // 延迟执行, 防止不稳定
  setTimeout(async () => {
    options.src = await qsc.toImage()
  }, 100)

  console.log('生成的options', options)

  return options
}

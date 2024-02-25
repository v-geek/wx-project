import { toast } from './uni'

// 将一维数组拆分为指定长度二维数组
export function groupArr<T = any>(array: T[], subLength: number): Array<T[]> {
  let index = 0

  const res = []

  while (index < array.length) {
    res.push(array.slice(index, (index += subLength)))
  }

  return res
}

export function deepClone<T = any>(obj: T) {
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)

  // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  if (typeof obj !== 'object') return obj

  const cloneObj: any = Array.isArray(obj) ? [] : {}

  for (let key in obj) {
    cloneObj[key] = deepClone(obj[key])
  }

  return cloneObj as T
}

export function throttle<T = any>(fn: Function, delay: number = 500) {
  let timer: NodeJS.Timeout | null = null
  let preTime = 0

  // 将this放在函数参数列表上声明类型即可, 使用的时候this不会干扰形参传入顺序
  return function (...args: T[]) {
    if (timer) clearTimeout(timer)

    const nowTime = Date.now()
    // 还有多少时间到下一次触发点, 保证最后一次函数会执行
    const remaining = delay - (nowTime - preTime)
    const context = this

    // 确保第一次函数会执行
    if (remaining <= 0) {
      fn.apply(context, args)
      preTime = Date.now()
    } else {
      // 确保最后一次函数会执行
      timer = setTimeout(() => {
        fn.apply(context, args)
      }, remaining)
    }
  }
}

export function isWxBrowser() {
  const ua = navigator.userAgent.toLowerCase()
  return ua.includes('micromessenger')
}

export function copyText(text: string) {
  // #ifndef H5
  uni.setClipboardData({
    data: text,
    success: () => {
      toast('复制成功!')
    },
    fail: () => {
      toast('复制失败!')
    }
  })
  // #endif

  // #ifdef H5
  const createInput = document.createElement('textarea')
  createInput.value = text
  document.body.appendChild(createInput)
  createInput.select()
  document.execCommand('Copy')
  createInput.className = 'createInput'
  createInput.style.display = 'none'
  toast('复制成功')
  // #endif
}

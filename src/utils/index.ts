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

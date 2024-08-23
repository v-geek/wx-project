declare module 'qs-canvas'

declare type Recordable<T = any> = Record<string, T>

declare interface Route {
  path: string
  aliasPath?: string
  meta?: {
    auth?: Boolean
    sync?: boolean
    title?: string
    group?: string
  }
}

declare const ROUTES: Route[]
declare const ROUTES_MAP: { [key: string]: Route }
declare const TABBAR: string[]

declare type ErrCode = 'NetworkError' | 'EnvError' | 'TemplateError' | string

/**
 * 将一个对象转换为一个只有两项的元组类型
 * 第一项是对象的Key类型, 第二项是对象的Val类型
 */
declare type ObjToKeyValArray<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T]

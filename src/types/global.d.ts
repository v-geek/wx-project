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

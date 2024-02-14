declare type Recordable<T = any> = Record<string, T>

declare interface IRoute {
  path: string
  aliasPath?: string
  meta?: {
    auth?: Boolean
    sync?: boolean
    title?: string
    group?: string
  }
}

declare const ROUTES: IRoute[]
declare const ROUTES_MAP: { [key: string]: IRoute }
declare const TABBAR: string[]

declare type ErrCode = 'NetworkError' | 'EnvError' | 'TemplateError' | string

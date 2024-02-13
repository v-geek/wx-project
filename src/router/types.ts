export interface IRoute {
  path: string
  aliasPath?: string
  meta?: {
    auth?: Boolean
    sync?: boolean
    title?: string
    group?: string
  }
}

export interface IParams {
  includes: (keyof IRoute)[]
  pagesJsonDir: string
}

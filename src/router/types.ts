export interface IParams {
  includes: (keyof Route)[]
  pagesJsonDir: string
}

export type IPath = string | Recordable

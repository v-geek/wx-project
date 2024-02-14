export interface IParams {
  includes: (keyof IRoute)[]
  pagesJsonDir: string
}

export type IPath = string | Recordable

export interface requestOptions extends UniApp.RequestOptions {
  baseUrl?: string
  loading?: boolean
  withoutToken?: boolean
}

export interface HttpRes<T = any> {
  code: number
  msg: string
  data: T
}

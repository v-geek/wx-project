export interface requestOptions extends UniApp.RequestOptions {
  baseUrl?: string
  loading?: boolean
}

export interface HttpRes<T = any> {
  code: number
  msg: string
  data: T
}

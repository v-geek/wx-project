import request from '..'
import type { ITest1Res } from '../types'

export const testGet1 = () =>
  request<ITest1Res>({
    baseUrl: 'https://jsonplaceholder.typicode.com',
    url: '/posts/1',
    method: 'GET'
  })

export const testPost1 = () =>
  request<ITest1Res>({
    baseUrl: 'https://jsonplaceholder.typicode.com',
    url: '/posts',
    method: 'POST',
    data: JSON.stringify({
      title: 'foo',
      body: 'bar',
      userId: 1
    })
  })

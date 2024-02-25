import request from '../index'

export const prepay = (data: Recordable) =>
  request({
    url: '/pay/prepay',
    method: 'POST',
    data
  })

export const bindWechat = (data: Recordable) =>
  request({
    url: '/bind/wechat',
    method: 'POST',
    data
  })

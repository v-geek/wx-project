import type { HttpRes, requestOptions } from './types'
import config from '@/config/env'
import { hideLoading, showLoading, showToast } from '@/utils/uni'
import { isObject } from '@/utils/is'
import { logout } from '@/utils/business'

const request = <T = HttpRes>(options: requestOptions): Promise<T> => {
  return new Promise((resolve, reject) => {
    const {
      loading,
      url,
      baseUrl = config.baseUrl,
      method,
      data,
      withoutToken,
      header
    } = options

    loading && showLoading()

    uni.request({
      url: url.includes('http') ? url : baseUrl + url,
      method,
      header: withoutToken
        ? header
        : {
            'Authorization-Token-Code': uni.getStorageSync('token'),
            ...header
          },
      data,
      success: (res: UniApp.RequestSuccessCallbackResult) => {
        const { statusCode, header, data } = res as unknown as {
          statusCode: number
          header: any
          data: T
        }

        if (header?.authorization) {
          const token = header.authorization.substr(7)
          uni.setStorageSync('token', token)
        }

        hideLoading()

        // eg: 404, 500
        if (statusCode < 200 || statusCode >= 400) {
          showToast('服务器开小差了')
          reject(res)
        }

        if (isObject(data) && data.code && !String(data.code).includes('200')) {
          showToast(data.msg)
          // token过期, 直接退出登录
          data.code == 401 && logout()
          reject(data)
        }

        resolve(data)
      },
      fail: (err: UniApp.GeneralCallbackResult) => {
        console.log('err', err)
        showToast('网络不给力，请检查你的网络设置~')
        hideLoading()
        reject(err)
      }
    })
  })
}

export default request

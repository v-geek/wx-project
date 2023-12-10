import { hideLoading, showLoading } from '@/config/loading'
import type { HttpRes, requestOptions } from './types'
import config from '@/config'
import { logout, showToast } from '@/utils'

const request = (options: requestOptions): Promise<any> => {
  return new Promise((resolve, reject) => {
    const { loading, url, baseUrl = config.baseUrl, method, data } = options

    loading && showLoading(loading)

    options.url = url.includes('http') ? url : baseUrl + url

    uni.request({
      url: baseUrl + url,
      method,
      header: {
        // 'content-type': method === 'GET' ? 'application/json; charset=utf-8' : 'application/x-www-form-urlencoded'
        'Authorization-Token-Code': uni.getStorageSync('token')
      },
      data,
      success: (res: UniApp.RequestSuccessCallbackResult) => {
        let { data, statusCode, header } = res

        data = data as HttpRes

        if (header?.authorization) {
          const token = header.authorization.substr(7)
          uni.setStorageSync('token', token)
        }

        hideLoading()

        if (statusCode !== 200) {
          showToast('服务器开小差了')
          reject(data)
        }

        if (!String(data.code).includes('200')) {
          showToast(data.msg)
          // token过期, 直接退出登录
          if (data.code == 401) logout()
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

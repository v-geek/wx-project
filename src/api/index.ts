import type { HttpRes, requestOptions } from './types'
import config from '@/config/env'
import { hideLoading, showLoading, showToast } from '@/utils/uni'
import { isObject } from '@/utils/is'
import useUserStore from '@/store/modules/user'

const userStore = useUserStore()

const request = <T = HttpRes>(options: requestOptions): Promise<T> => {
  const { loading, url, baseUrl = config.baseUrl, auth = true, header } = options

  const reqOptions = {
    url: url.includes('http') ? url : baseUrl + url,
    timeout: 12000
  } as requestOptions

  if (header || auth) {
    reqOptions.header = auth
      ? {
          'Authorization-Token-Code': uni.getStorageSync('token'),
          ...header
        }
      : header
  }

  Object.keys(options).forEach(key => {
    if (!['loading', 'url', 'baseUrl', 'auth', 'header'].includes(key)) {
      // @ts-ignore
      reqOptions[key] = options[key]
    }
  })

  return new Promise((resolve, reject) => {
    loading && showLoading()

    uni.request({
      ...reqOptions,
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
          handleError(statusCode)
          reject(res)
        }

        if (isObject(data) && data.code == 401) {
          showToast(options.showError ? data.msg : get401Msg())
          userStore.logout()
          reject(res)
        }

        resolve(data)
      },
      fail: (err: UniApp.GeneralCallbackResult) => {
        console.log('err', err)

        let errMsg = '网络不给力，请检查你的网络设置~'
        if (err.errMsg.includes('timeout')) errMsg = '请求超时'
        // #ifdef H5
        if (err.errMsg.includes('Network')) {
          errMsg = window.navigator.onLine ? '服务器异常' : '请检查您的网络连接'
        }
        // #endif

        showToast(errMsg)
        hideLoading()
        reject(err)
      }
    })
  })
}

function handleError(code: number) {
  const errMsgObj = {
    400: '请求错误',
    401: get401Msg(),
    403: '拒绝访问',
    404: '请求出错',
    408: '请求超时',
    429: '请求频繁, 请稍后再访问',
    500: '服务器开小差啦,请稍后再试~',
    501: '服务未实现',
    502: '网络错误',
    503: '服务不可用',
    504: '网络超时',
    505: 'HTTP版本不受支持'
  }

  const errMsg = errMsgObj[code as keyof typeof errMsgObj]

  showToast(errMsg)

  if (code == 401) {
    userStore.logout()
  }
}

function get401Msg() {
  return userStore.isLogin ? '您的登陆已过期' : '请先登录'
}

export default request

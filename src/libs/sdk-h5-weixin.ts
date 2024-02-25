/**
 * https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html
 */
import jsSdk from 'weixin-js-sdk'
import { isWxBrowser } from '@/utils'
import { toast } from '@/utils/uni'

export default {
  // 所有接口调用都必须在config接口获得结果之后, config是一个客户端的异步操作
  // 所以如果需要在页面加载时就调用相关接口, 则须把相关接口放在ready函数中调用来确保正确执行
  // 对于用户触发时才调用的接口, 则可以直接调用, 不需要放在ready函数中
  isReady(api: () => void) {
    jsSdk.ready(api)
  },

  // 初始化JSSDK
  init(callback: Function) {
    if (!isWxBrowser()) {
      return toast('请使用微信网页浏览器打开')
    }

    const url = location.href.split('#')[0]

    const data = 'http-res-to-do'

    jsSdk.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来, 若要查看传入的参数, 可以在pc端打开, 参数信息会通过log打出, 仅在pc端时才会打印。
      appId: 'xxxx', // 必填, 公众号的唯一标识
      timestamp: 135121, // 必填, 生成签名的时间戳
      nonceStr: 'xxxx', // 必填, 生成签名的随机串
      signature: 'dwadaaaaa', // 必填, 签名
      jsApiList: [] // 必填, 需要使用的JS接口列表
    })

    // config信息验证失败会执行error函数, 如签名过期导致验证失败
    jsSdk.error(err => {
      console.log('err', err)
    })

    if (callback) callback(data)
  },

  // 在需要定位页面调用
  getLocation(callback: Function) {
    this.isReady(() => {
      jsSdk.getLocation({
        type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: res => {
          callback(res)
        },
        fail: err => {
          console.log('err', err)
        }
      })
    })
  },

  // 获取微信收货地址
  openAddress(callback: { success: Function; error: Function }) {
    this.isReady(() => {
      ;(jsSdk as Recordable).openAddress({
        success: (res: Recordable) => {
          callback.success && callback.success(res)
        },
        fail: (err: any) => {
          console.log('err', err)
          callback.error && callback.error(err)
        }
      })
    })
  },

  // 微信扫码
  scanQRCode(needResult: 0 | 1, callback: (res: { resultStr: string }) => void) {
    this.isReady(() => {
      jsSdk.scanQRCode({
        needResult, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
        success: res => {
          callback(res)
        },
        fail: err => {
          console.log('err', err)
        }
      })
    })
  },

  // 微信支付
  wxpay(data: Recordable, callback: Recordable) {
    this.isReady(() => {
      jsSdk.chooseWXPay({
        timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
        package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
        signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: data.paySign, // 支付签名
        success: res => {
          callback.success && callback.success(res)
        },
        fail: err => {
          callback.fail && callback.fail(err)
        },
        cancel: err => {
          callback.cancel && callback.cancel(err)
        }
      })
    })
  }
}

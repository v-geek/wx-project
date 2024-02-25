import { prepay } from '@/api/modules/pay'
import { toast } from '@/utils/uni'
import platform from '.'

// #ifdef H5
import wxSdk from '@/libs/sdk-h5-weixin'
// #endif

type IPayType = 'wechat' | 'alipay' | 'wallet' | 'offline' // 货到付款

class Pay {
  private payment // 支付方式
  private orderType // 订单类型
  private orderSN // 订单号

  constructor(payment: IPayType[], orderType: string, orderSN: string) {
    this.payment = payment
    this.orderType = orderType
    this.orderSN = orderSN
    this.pay()
  }

  pay() {
    const payAction = {
      WechatMiniProgram: {
        wechat: () => {
          this.wechatMiniProgramPay()
        },
        alipay: () => {
          // this.copyPayLink()
        },
        money: () => {
          // this.moneyPay()
        },
        offline: () => {
          // this.offlinePay()
        }
      }
    }
  }

  // 预支付
  prepay() {
    return new Promise((resolve, reject) => {
      const params = {
        order_sn: this.orderSN,
        payment: this.payment
      }

      if (uni.getStorageSync('openid')) {
        // @ts-ignore
        params.openid = uni.getStorageSync('openid')
      }

      // prepay(params).then(res => {
      //   if (res.code === -2001 && res.msg === 'miss_openid') {
      //     uni.showModal({
      //       title: '微信支付',
      //       content: '请先绑定微信再使用微信支付',
      //       success: res => {
      //         if (res.confirm) {
      //           platform.useProvider('wechat').bind()
      //         }
      //       }
      //     })
      //   }

      //   res.code === 2008 && resolve(res.data)
      // })
    })
  }

  // 微信小程序支付
  async wechatMiniProgramPay() {
    const that = this
    const result = await this.prepay()

    // uni.requestPayment({
    //   provider: 'wxpay',
    //   ...result.data.pay_data,
    //   success: (res: any) => {
    //     that.payResult('success')
    //   },
    //   fail: (err: any) => {
    //     if (err.errMsg === 'requestPayment:fail cancel') {
    //       toast('支付已手动取消')
    //     } else {
    //       that.payResult('fail')
    //     }
    //   }
    // })
  }
}

export default Pay

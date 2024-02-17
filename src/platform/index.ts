import { isWxBrowser } from '@/utils'
import wechat from './provider/wechat'
import app from './provider/app'

let provider = ''

// #ifdef H5
if (isWxBrowser()) {
  provider = 'wechat'
}
// #endif

// #ifdef MP-WEIXIN
provider = 'wechat'
// #endif

// #ifdef APP-PLUS
provider = 'app'
// #endif

// 加载当前平台前置行为
const load = () => {
  if (provider === 'wechat') {
    wechat.load()
  }

  if (provider === 'app') {
    // to-do
  }
}

const useProvider = (_provider = '') => {
  if (_provider === '') _provider = provider
  if (_provider === 'wechat') return wechat
  if (_provider === 'app') return app
}

/**
 * 检查更新 (只检查小程序和App)  eg: 点击按钮触发动作
 * @param {Boolean} silence - 静默检查
 */
const checkUpdate = (silence: boolean = false) => {
  // #ifdef MP-WEIXIN
  useProvider().checkUpdate(silence)
  // #endif

  // #ifdef APP-PLUS
  // TODO: 热更新
  // #endif
}

interface INetworkType {
  networkType: 'wifi' | '2g' | '3g' | '4g' | '5g' | 'ethernet' | 'unknown' | 'none'
}

async function checkNetwork() {
  const networkStatus = (await uni.getNetworkType()) as unknown as INetworkType
  if (networkStatus.networkType == 'none') {
    return Promise.resolve(false)
  }
  return Promise.resolve(true)
}

const platform = {
  load,
  checkUpdate,
  checkNetwork
}

export default platform

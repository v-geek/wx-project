let baseUrl = ''

// #ifdef H5
baseUrl = import.meta.env.VITE_PROXY_KEY
// #endif

// #ifdef MP-WEIXIN
const baseUrlObj = {
  develop: 'https://www.baidu.com/',
  trial: 'https://www.baidu.com/',
  release: 'https://www.baidu.com/'
}

const { envVersion } = uni.getAccountInfoSync().miniProgram

baseUrl = baseUrlObj[envVersion]
// #endif

const config = {
  baseUrl
}

export default config

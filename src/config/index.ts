let baseUrl = ''

// #ifdef H5
baseUrl = process.env.VITE_PROXY_KEY as string
// #endif

// #ifndef H5
// 小程序的 api prefix
const baseUrlObj = {
  develop: 'https://www.baidu.com/',
  trial: 'https://www.baidu.com/',
  release: 'https://www.baidu.com/'
}

const envVersion = uni.getAccountInfoSync().miniProgram
  .envVersion as UniApp.MiniProgram['envVersion']

baseUrl = baseUrlObj[envVersion]
// #endif

const config = {
  baseUrl
}

export default config

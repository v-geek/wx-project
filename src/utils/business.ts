export const logout = () => {
  uni.removeStorageSync('token')

  uni.reLaunch({
    url: '/pages/login/index',
    complete: () => {
      // #ifdef APP-PLUS
      plus.navigator.closeSplashscreen()
      // #endif
    }
  })
}

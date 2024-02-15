import { defineStore } from 'pinia'

const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    token: 'token-xxxxxxxx',
    userId: '1112',
    isLogin: !!uni.getStorageSync('token'),
    nickname: '张三'
  }),
  getters: {
    // token: state => {
    //   return state.userInfo.token
    // },
    // userId: state => {
    //   return state.userInfo.userId
    // }
  },
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setUseId(id: string) {
      this.userId = id
    },
    logout() {
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
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'user-store'
      }
    ]
  }
})

export default useUserStore

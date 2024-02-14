import { defineStore } from 'pinia'

const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    token: 'token',
    user_id: '1112',
    isLogin: !!uni.getStorageSync('token')
  }),
  getters: {
    // token: state => {
    //   return state.userInfo.token
    // },
    // userId: state => {
    //   return state.userInfo.user_id
    // }
  },
  actions: {
    setUseId(id: string) {
      this.user_id = id
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

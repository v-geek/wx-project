import { defineStore } from 'pinia'

export default defineStore({
  id: 'user',
  state: () => ({
    userInfo: {
      token: 'token',
      user_id: 1112
    }
  }),
  getters: {
    token: state => {
      return state.userInfo.token
    },
    userId: state => {
      return state.userInfo.user_id
    }
  },
  actions: {
    setUserInfo(userInfo: any) {
      Object.assign(this.userInfo, userInfo)
    }
  }
})

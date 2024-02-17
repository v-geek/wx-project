import { defineStore } from 'pinia'
import platform from '@/platform'
import router from '@/router'
import config from '@/config'

const useSystemStore = defineStore({
  id: 'system',
  state: () => ({
    test: 'xxxxxxxx'
  }),
  actions: {
    async init() {
      const networkStatus = await platform.checkNetwork()

      // 检查网络
      if (!networkStatus) {
        router.error('networkError')
      }

      // 检查配置
      if (!config.baseUrl) {
        router.error('envError')
      }

      // get-user-info
      // to-do
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'system-store'
      }
    ]
  }
})

export default useSystemStore

import { defineStore } from 'pinia'
import router from '@/router'
import config from '@/config'
import { checkNetwork } from '@/utils/uni'

const useSystemStore = defineStore({
  id: 'system',
  state: () => ({
    test: 'xxxxxxxx'
  }),
  actions: {
    async init() {
      const networkStatus = await checkNetwork()

      // 检查网络
      if (!networkStatus) {
        return router.error('networkError')
      }

      // 检查配置
      if (!config.baseUrl) {
        return router.error('envError')
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

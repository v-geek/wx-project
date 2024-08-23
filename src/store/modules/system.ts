import { defineStore } from 'pinia'
import router from '@/router'
import type { NetworkType, SystemState } from '../types'

const useSystemStore = defineStore({
  id: 'system',
  state: (): SystemState => ({
    safeAreaHeight: 0
  }),
  actions: {
    checkNetwork() {
      const networkStatus = uni.getNetworkType() as unknown as NetworkType
      if (networkStatus.networkType == 'none') {
        return router.error('networkError')
      }
    },
    setState(...args: ObjToKeyValArray<SystemState>) {
      this.$patch({ [args[0]]: args[1] })
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

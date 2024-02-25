import { bindWechat } from '@/api/modules/pay'

interface IUpdateManager extends UpdateManager {
  onCheckForUpdate(callback?: (res: { hasUpdate: boolean }) => void): void
}

// 加载微信小程序
const load = () => {
  checkUpdate()
}

// 小程序更新
async function checkUpdate(silence = true) {
  if (uni.canIUse('getUpdateManager')) {
    const updateManager = uni.getUpdateManager() as IUpdateManager

    updateManager.onCheckForUpdate((res: any) => {
      // 请求完新版本信息的回调
      if (res.hasUpdate) {
        updateManager.onUpdateReady(() => {
          uni.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success: res => {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate()
              }
            }
          })
        })

        updateManager.onUpdateFailed(() => {
          // 新的版本下载失败
          uni.showModal({
            title: '已经有新版本了哟~',
            content: '新版本已经上线啦，请您删除当前小程序，重新搜索打开~'
          })
        })
      } else {
        if (!silence) {
          uni.showModal({
            title: '当前为最新版本',
            showCancel: false
          })
        }
      }
    })
  } else {
    uni.showModal({
      title: '提示',
      content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
    })
  }
}

export default {
  load,
  checkUpdate
}

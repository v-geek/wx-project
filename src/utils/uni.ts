export const showToast = (
  title: string,
  icon: UniApp.ShowToastOptions['icon'] = 'none'
) => {
  uni.showToast({
    title,
    icon
  })
}

export const showLoading = (title = '加载中...', mask = true) => {
  uni.showLoading({
    title,
    mask
  })
}

export const hideLoading = () => {
  uni.hideLoading()
}

/**
 * @description: 微信小程序保存图片到相册, H5 请使用浏览器自带的 长按保存 功能
 * @param url http 在线地址
 */
export const saveImg = (url: string) => {
  // #ifdef MP-WEIXIN
  // 如果用户之前已经同意授权，直接返回成功
  uni.authorize({
    // 保存到相册的授权
    scope: 'scope.writePhotosAlbum',
    success: () => {
      showLoading('加载中...')

      uni.getImageInfo({
        src: url,
        success: (res: GetImageInfoSuccessData) => {
          uni.saveImageToPhotosAlbum({
            filePath: res.path,
            success: () => {
              uni.showToast({ title: '保存至相册成功', icon: 'success' })
              hideLoading()
            },
            fail: () => {
              uni.showToast({ title: '保存图片失败', icon: 'error' })
              hideLoading()
            }
          })
        },
        fail: () => {
          hideLoading()
          uni.showToast({ title: '获取图片信息(临时地址)失败', icon: 'none' })
        }
      })
    },
    // 如果用户之前拒绝了授权，此接口会直接进入失败回调
    fail: () => {
      uni.showModal({
        title: '提示',
        content: '若点击不授权，将无法保存图片',
        cancelText: '不授权',
        cancelColor: '#999',
        confirmText: '去授权',
        confirmColor: '#009fff',
        success: (res: ShowModalRes) => {
          if (res.confirm) {
            // 调起客户端小程序设置界面，返回用户设置的操作结果
            uni.openSetting({
              success: (res: { authSetting: AuthSetting }) => {
                if (res.authSetting['scope.writePhotosAlbum']) {
                  uni.showToast({ title: '授权成功' })
                }
              },
              fail: () => uni.showToast({ title: '授权失败' })
            })
          }
        }
      })
    }
  })
  // #endif
}

/**
 * 以同步的形式调用uniapp的方法
 */
export const uniapp = <T = any, P = any>(
  key: keyof UniApp.Uni,
  options: UniApp.Uni[keyof UniApp.Uni] | {} = {}
): Promise<T | P> =>
  new Promise((resolve, reject) => {
    const defaultOptions = {
      success: (res: T) => {
        resolve(res)
      },
      fail: (err: P) => {
        reject(err)
      }
    }

    const uniFn = uni[key] as Function

    uniFn({ ...defaultOptions, ...options })
  })

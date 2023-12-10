let loadingCount = 0

export function showLoading(loading: boolean) {
  if (loading) {
    uni.showLoading({
      title: '加载中'
    })

    loadingCount = loadingCount + 1
  }
}

export function hideLoading() {
  loadingCount = loadingCount - 1

  if (loadingCount === 0) {
    uni.hideLoading()
  }
}

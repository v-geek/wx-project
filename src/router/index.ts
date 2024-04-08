import useUserStore from '@/store/modules/user'
import { isEmpty, isObject, isString } from '@/utils/is'
import type { IPath } from './types'

function go(path: IPath, params = {}, options = { redirect: false }) {
  let page = '' // 跳转页面
  let query = '' // 页面参数
  let url = '' // 跳转页面完整路径

  if (isString(path)) {
    // 判断跳转类型是 path ｜ 还是http
    if (path.startsWith('http')) {
      // #ifdef H5
      return (window.location.href = path)
      // #endif

      // #ifndef H5
      page = `/pages/public/webview`
      query = `url=${encodeURIComponent(path as string)}`
      // #endif
    } else if (path.startsWith('action:')) {
      return handleAction(path)
    } else {
      page = path.split('?')[0]
      query = path.split('?')[1] ?? ''
    }

    if (!isEmpty(params)) {
      const pQuery = paramsToQuery(params)
      query = query == '' ? pQuery : query + '&' + pQuery
    }
  }

  if (isObject(path)) {
    page = path.url

    if (isObject(path.params)) {
      query = paramsToQuery(path.params)
    }
  }

  const nextRoute = ROUTES_MAP[page]

  // 未找到指定跳转页面
  // to-do: 跳转404页
  if (!nextRoute) {
    console.log(`%c跳转路径参数错误<${page || 'EMPTY'}>`, 'color:red;background:yellow')
    return
  }

  // 页面登录拦截
  if (nextRoute.meta?.auth && !useUserStore().isLogin) {
    // return showAuthModal()
  }

  url = page

  // 拼接查询参数
  if (!isEmpty(query)) url += `?${query}`

  // 跳转底部导航
  if (TABBAR.includes(page)) {
    return uni.switchTab({
      url
    })
  }

  // 使用redirect跳转
  if (options.redirect) {
    return uni.redirectTo({
      url
    })
  }

  uni.navigateTo({
    url
  })
}

const handleAction = (path: string) => {
  const action = path.split(':')

  switch (action[1]) {
    case 'showShareModal':
      // showShareModal()
      break
  }
}

const paramsToQuery = (params: Recordable) => {
  if (isEmpty(params)) {
    return ''
  }

  const query: string[] = []

  Object.keys(params).forEach(key => {
    query.push(key + '=' + params[key])
  })

  return query.join('&')
}

// H5端页面刷新之后页面栈会消失，此时navigateBack不能返回(点击刷新 == 刷新原页面)，如果一定要返回可以使用history.back()导航到浏览器的其他历史记录
function back() {
  // #ifdef H5
  history.back()
  // #endif

  // #ifndef H5
  uni.navigateBack()
  // #endif
}

function redirect(path: IPath, params = {}) {
  go(path, params, {
    redirect: true
  })
}

// 检测是否有浏览器历史
function hasHistory() {
  // #ifdef H5
  return !!history.state.back
  // #endif

  // #ifndef H5
  return getCurrentPages().length > 1
  // #endif
}

function getCurrentPage() {
  const pages = getCurrentPages()
  return pages[pages.length - 1]
}

function error(errCode: ErrCode, errMsg = '') {
  redirect('/pages/public/error', {
    errCode,
    errMsg
  })
}

const router = {
  go,
  back,
  redirect,
  hasHistory,
  getCurrentPage,
  error
}

export default router

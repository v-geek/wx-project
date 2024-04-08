import fs from 'fs'
import { isArray } from '../../utils/is'
import stripJsonComments from './strip-json-comments.js'
import type { IParams } from '../types'

class transformPages {
  // 需要提取的字段
  private includes: IParams['includes']
  private pagesJson: Recordable
  public routes: Route[]
  public tabbar: string[]
  public routesMap: Recordable

  constructor({ includes, pagesJsonDir }: IParams) {
    this.includes = includes
    const fileContent = fs.readFileSync(pagesJsonDir, 'utf-8') as string
    this.pagesJson = JSON.parse(stripJsonComments(fileContent))
    this.routes = this.getPagesRoutes().concat(this.getSubPackagesRoutes())
    this.routesMap = this.transformPathToKey(this.routes)
    this.tabbar = this.getTabbarRoutes()
  }

  /**
   * 生成主包的routes
   */
  getPagesRoutes(pages = this.pagesJson.pages, rootPath = null): Route[] {
    const routes = pages.map((page: Recordable, pageIndex: number) => {
      const route = {} as Route

      this.includes.forEach((key: keyof Route) => {
        let value = page[key]

        // 添加前缀
        if (key === 'path') {
          value = rootPath ? `/${rootPath}/${value}` : `/${value}`
        }

        if (key === 'aliasPath' && pageIndex == 0 && rootPath == null) {
          route[key] = route[key] || '/'
        } else if (value !== undefined) {
          route[key] = value
        }
      })

      return route
    })

    return routes
  }

  /**
   * 生成分包的routes
   */
  getSubPackagesRoutes() {
    if (!this.pagesJson?.subPackages) {
      return []
    }

    const routes: Route[] = []

    this.pagesJson.subPackages.forEach((subPagesObj: Recordable) => {
      const subPages = subPagesObj.pages
      const root = subPagesObj.root
      const subRoutes = this.getPagesRoutes(subPages, root)
      routes.push(...subRoutes)
    })

    return routes
  }

  transformPathToKey(list: Recordable[]) {
    if (!isArray(list) || list.length == 0) {
      return []
    }
    const map: Recordable = {}
    list.forEach(item => (map[item.path] = item))
    return map
  }

  getTabbarRoutes() {
    if (!this.pagesJson?.tabBar?.list) {
      return []
    }

    const tabbar = this.pagesJson.tabBar.list

    const tabRoutes = tabbar.map((tab: Recordable) => {
      return '/' + tab.pagePath
    })

    return tabRoutes
  }
}

const uniReadPages = (params: IParams) => {
  const pageData = new transformPages(params)

  return {
    name: 'uniReadPages',
    config: () => ({
      define: {
        ROUTES: pageData.routes,
        ROUTES_MAP: pageData.routesMap,
        TABBAR: pageData.tabbar
      }
    })
  }
}

export default uniReadPages

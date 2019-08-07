import { compareDeep, reverseObject } from '@lib/utils/object'
import * as Taro from '@tarojs/taro'

import { action, computed, observable, toJS } from 'mobx'

import { H5Pages, h5PagesMap, loginPages, Pages, pagesMap } from './../../route'

const routeList: IStringObject = reverseObject(pagesMap)
type PagesRoutes = Array<{ page: Pages; params: IPlainObject }>

class Router {
  /**
   * 是否有上个页面
   */
  @computed get hasPrePage() {
    return this.historyPagesRoutes.length > 1
  }

  /**
   * 路由是否为前进
   */
  @computed get isForward() {
    return this.direction === 'forward'
  }

  /**
   * 当前路由对象
   */
  @computed private get curRoute() {
    return this.historyPagesRoutes[this.historyPagesRoutes.length - 1]
  }

  /**
   * 当前页面
   */
  @computed get curPage() {
    return this.curRoute.page as Pages
  }

  /**
   * 当前页面参数
   */
  @computed get curPagePrams() {
    return this.curRoute.params as IPlainObject
  }
  /**
   * 当前路由url
   */
  @computed get curUrl() {
    return this.toUrl(this.curPage, this.curPagePrams)
  }
  // 专用属性, 勿用
  readonly backParamsMap: IPlainObject = {}

  @observable pageVisible: Pages | null = null

  @observable private historyPagesRoutes: PagesRoutes = [{ page: 'home', params: {} }]

  @observable private direction: 'forward' | 'back' = 'forward'

  /**
   * 专用方法,勿用
   */
  @action syncPageVisible(page: Pages | null) {
    this.pageVisible = page
  }

  /**
   * 专用方法,勿用
   */
  @action syncRoutes() {
    const wxRoutes = Taro.getCurrentPages()
    this.direction = wxRoutes.length >= this.historyPagesRoutes.length ? 'forward' : 'back'
    const tempRoutes = wxRoutes.map(item => item.route).map((v, i) => ({ page: routeList[v], params: wxRoutes[i].options })) as PagesRoutes
    const tempRoutesLast = tempRoutes[tempRoutes.length - 1] || {}

    this.syncPageVisible(tempRoutesLast.page)

    if (tempRoutesLast.page === this.curPage && compareDeep(tempRoutesLast.params, this.curPagePrams) && tempRoutes.length === this.historyPagesRoutes.length) {
      return
    }

    if (!this.isForward) {
      tempRoutesLast.params = { ...tempRoutesLast.params, ...this.backParamsMap[tempRoutesLast.page] }
    }

    // 更新路由
    this.historyPagesRoutes = tempRoutes

    console.log(
      '%c%s',
      'color: #20bd08;font-size:15px',
      '路由同步!!!',
      '路由页>',
      this.curPage,
      '路由参数>',
      toJS(this.curPagePrams),
      '路由栈>',
      toJS(this.historyPagesRoutes).map(item => item.page),
      '路由方向',
      this.direction,
      this.curUrl
    )
  }

  /**
   * 获取encodeURIComponent后的页面路径,
   */
  getPagePath(page: Pages, params: IPlainObject = {}) {
    const newParams = Object.keys(params).reduce(
      (pre, curr) => {
        pre[curr] = encodeURIComponent(params[curr] as any)
        return pre
      },
      {} as IPlainObject
    )
    return this.toUrl(page, newParams)
  }

  /**
   * 保留当前页面，跳转到应用内的某个页面，使用Taro.navigateBack可以返回到原页面。
   */

  navigateTo(page: Pages, params: IPlainObject = {}) {
    if (!this.filterPage(page)) {
      return
    }
    if (this.historyPagesRoutes.length > 10) {
      Taro.redirectTo({ url: this.toUrl(page, params) })
    } else {
      Taro.navigateTo({ url: this.toUrl(page, params) })
    }
  }

  /**
   * 保留当前页面，跳转到应用内的某个h5，使用Taro.navigateBack可以返回到原页面。
   */
  @action
  navigateToH5(page: H5Pages, params: IPlainObject = {}) {
    const { title, ...otherParams } = params
    const url = h5PagesMap[page]
    if (!url) {
      Taro.showToast({ title: '页面不存在', icon: 'none', duration: 1000 })
      return
    }
    const query = Object.keys(otherParams)
      .map(__ => `${__}=${otherParams[__]}`)
      .join('&')
    const srcStr = query ? `${url}?${query}` : `${url}`
    const encodeSrcStr = encodeURIComponent(srcStr)
    this.navigateTo('h5', {
      src: encodeSrcStr,
      ...(title ? { title } : null),
    })
  }

  /**
   * 关闭当前页面，跳转到应用内的某个页面。
   */
  redirectTo(page: Pages, params: IPlainObject = {}) {
    if (!this.filterPage(page)) {
      return
    }
    Taro.redirectTo({ url: this.toUrl(page, params) })
  }

  /**
   * 刷新页面
   */
  refresh() {
    Taro.redirectTo({ url: this.curUrl })
  }

  /**
   * 关闭所有页面，打开到应用内的某个页面。
   */
  reLaunch(page: Pages, params: IPlainObject = {}) {
    if (!this.filterPage(page)) {
      return
    }
    Taro.reLaunch({ url: this.toUrl(page, params) })
  }

  /**
   * 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages() 获取当前的页面栈，决定需要返回几层。
   */
  navigateBack() {
    if (this.hasPrePage) {
      Taro.navigateBack()
    }
  }

  /**
   * 跳回登录之前的页面
   */
  loginBack() {
    const routes = this.historyPagesRoutes.filter(item => !loginPages.includes(item.page))
    const len = this.historyPagesRoutes.length - routes.length

    // 登录之前的页面 则跳到首页
    if (!routes.length || !len) {
      this.reLaunch('home')
    } else {
      Taro.navigateBack({ delta: len })
    }
  }

  private filterPage(page: Pages) {
    const url = pagesMap[page]

    if (!url) {
      Taro.showToast({ title: '页面不存在', icon: 'none', duration: 1000 })
      return
    }

    // 避免多次跳转登录
    if (page === 'login' && this.curPage === 'login') {
      return
    }

    return true
  }

  private toUrl(page: Pages, params: IPlainObject) {
    if (!page) {
      return ''
    }
    const url = pagesMap[page]
    const paramStr =
      (url.includes('?') ? '&' : '?') +
      Object.keys(params)
        .filter(__ => params[__] !== undefined || params[__] !== null || params[__] !== 'undefined' || params[__] !== 'null')
        .map(key => key + '=' + params[key])
        .join('&')

    return '/' + url + paramStr
  }
}

export default new Router()

import { default as Taro, pxTransform } from '@tarojs/taro'

const bangsScreenEnum = ['iphone x', 'iphone xs', 'iphone xs max']

class System {
  /**
   * 系统信息
   */
  systemInfo: Taro.getSystemInfo.Promised = {} as Taro.getSystemInfo.Promised

  /**
   * 是否是刘海屏 例如: iphonex iphonexs iphonexs max
   */
  get isBangsScreen() {
    const { model } = this.systemInfo
    return model && this.judgeBangsScreen(model)
  }

  /**
   * 是否有下巴 例如: iphonex iphonexs iphonexs max
   */
  get hasJawScreen() {
    const { model } = this.systemInfo
    return model && this.judgeJawScreen(model)
  }

  /**
   * 导航栏的高度
   */

  get navHeight() {
    const { system } = this.systemInfo
    return system ? (system.indexOf('iOS') > -1 ? 44 : 48) : 0
  }

  /**
   * 工具栏的高度
   */
  get barHeight() {
    const { statusBarHeight } = this.systemInfo
    return statusBarHeight || 0
  }

  /**
   * 默认内容区域的高度
   */
  get bodyContentHeight() {
    return this.systemInfo ? this.systemInfo.windowHeight : 0
  }

  /**
   * iphone系列有下巴屏幕,下巴的垫片的高度
   */
  ipxBottom = 34

  constructor() {
    Taro.getSystemInfo({
      success: (systemInfo: Taro.getSystemInfo.Promised) => {
        this.systemInfo = systemInfo
        console.log('%c%s', 'color: #20bd08;font-size:15px', '===TQY===: System -> constructor -> systemInfo', systemInfo)
      },
    })
  }

  /**
   * 根据小程序,h5转换成rpx,rem
   * @param px 大小
   */
  topx(px: number) {
    return pxTransform(px * 2)
  }

  /**
   * 获取自定义导航内容的高度
   * @param bottomHeight 底部高度
   * @param navBarHeight 导航高度
   */
  getCustomNavContentHeight(bottomHeight: number = 0, navBarHeight: number = this.navHeight + this.barHeight) {
    const { windowHeight } = this.systemInfo
    const bHeight = this.hasJawScreen ? bottomHeight + this.ipxBottom : bottomHeight
    const bodyContent = windowHeight - bHeight - navBarHeight

    return bodyContent
  }

  /**
   * 获取顶部高度
   * @param navBarHeight 导航高度
   */
  getNavBarHeight(navBarHeight: number = this.navHeight + this.barHeight) {
    return navBarHeight
  }

  /**
   * 获取底部高度
   * @param bottomHeight 底部高度
   */
  getBottomHeight(bottomHeight: number = 0) {
    const bHeight = this.hasJawScreen ? bottomHeight + this.ipxBottom : bottomHeight
    return bHeight
  }

  /**
   * 判断是否是刘海屏
   * @param model phone model
   */
  private judgeBangsScreen(model: string) {
    const modelLowerCase = model.toLowerCase()
    return bangsScreenEnum.findIndex(__ => modelLowerCase.indexOf(__) > -1) > -1
  }

  /**
   * 判断是否有下巴
   * @param model phone model
   */
  private judgeJawScreen(model: string) {
    const modelLowerCase = model.toLowerCase()
    return bangsScreenEnum.findIndex(__ => modelLowerCase.indexOf(__) > -1) > -1
  }
}

export default new System()

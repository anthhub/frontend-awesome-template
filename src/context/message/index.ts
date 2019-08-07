import * as Taro from '@tarojs/taro'

function alert(title: string, content: string) {
  return Taro.showModal({
    title,
    content,
    showCancel: false,
  })
}

function confirm(title: string, content: string) {
  return Taro.showModal({
    title,
    content,
  })
}

/**
 *  延迟执行toast 解决小程序真机toast闪烁bug
 * @param title {string} 提示信息
 * @param closeTime {number} 关闭时间 [closeTime=2000]
 * @param icon {string} [icon='none']
 */
function delayToast(title: string, closeTime = 2000, icon = 'none') {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        Taro.showToast({ title, icon })
        setTimeout(() => {
          Taro.hideToast()
          resolve()
        }, closeTime)
      }, 0)
    } catch (error) {
      reject(error)
    }
  })
}

export default { alert, confirm, delayToast }

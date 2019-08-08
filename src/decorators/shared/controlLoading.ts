import view from '@store/view'
import Taro from '@tarojs/taro'

export function controlLoading(type: 'spin' | 'skeleton' = 'spin') {
  return function (this: any, _target: any, _propertyKey: string, descriptor: TypedPropertyDescriptor<(...args: any[]) => any>) {
    const method = descriptor.value as (...args: any[]) => any

    const newMethod = async function (this: any, ...args: any[]) {
      let value = null

      if (type === 'spin') {
        Taro.showLoading({
          title: '加载中',
          mask: true,
        })
      }
      if (type === 'skeleton') {
        view.setProps({ showSkeleton: true })
      }

      try {
        value = await method.apply(this, args)
      } catch (error) {
        throw error
      } finally {
        if (type === 'spin') {
          Taro.hideLoading()
        }
        if (type === 'skeleton') {
          view.setProps({ showSkeleton: false })
        }
      }

      return value
    }

    descriptor.value = newMethod
    return descriptor
  }
}

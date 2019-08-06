import Taro from '@tarojs/taro'

// // 函数开始和结束加入钩子
export function controlLoading(type: 'spin' | 'skeleton' = 'spin') {
  return function (this: any, _target: any, _propertyKey: string, descriptor: TypedPropertyDescriptor<(...args: any[]) => any>) {
    const method = descriptor.value as (...args: any[]) => any

    const newMethod = async function (this: any, ...args: any[]) {
      let value = null
      Taro.showLoading()

      try {
        value = await method.apply(this, args)
      } catch (error) {
        throw error
      } finally {
        Taro.hideLoading()
      }

      return value
    }

    descriptor.value = newMethod
    return descriptor
  }
}

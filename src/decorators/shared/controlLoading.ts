import view from '@store/view'

// // 函数开始和结束加入钩子
export function controlLoading(type: 'spin' | 'skeleton' = 'spin') {
  return function (this: any, _target: any, _propertyKey: string, descriptor: TypedPropertyDescriptor<(...args: any[]) => any>) {
    const method = descriptor.value as (...args: any[]) => any

    const newMethod = async function (this: any, ...args: any[]) {
      let value = null
      // Taro.showLoading({
      //   title: '加载中',
      //   mask: true,
      // })
      view.setProps({ showSkeleton: true })

      try {
        value = await method.apply(this, args)
      } catch (error) {
        throw error
      } finally {
        // Taro.hideLoading()
        view.setProps({ showSkeleton: false })
      }

      return value
    }

    descriptor.value = newMethod
    return descriptor
  }
}

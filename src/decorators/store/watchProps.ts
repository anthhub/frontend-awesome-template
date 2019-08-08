import { reaction } from 'mobx'

/**
 * 监听路由
 */
export function watchProps(cb: (...args: any[]) => any = () => ({})) {
  return function (this: any, target: any, _propertyKey: string, descriptor: TypedPropertyDescriptor<(...args: any[]) => any>) {
    const method = descriptor.value as (...args: any[]) => any

    const newMethod = function (this: any, ...args: any[]) {
      if (!this.store) {
        return
      }

      return method.apply(this, args)
    }
    descriptor.value = newMethod

    reaction(
      () => cb(target),
      flag => {
        if (flag == null) {
          return
        }

        return newMethod.apply(target, [flag])
      }
    )
    return descriptor
  }
}

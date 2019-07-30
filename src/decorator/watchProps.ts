import { reaction } from 'mobx'

/**
 * 监听路由
 */
export function watchProps(cb: (...args: any[]) => any = () => ({})) {
  // tslint:disable-next-line: only-arrow-functions
  return function (target: any, _propertyKey: string, descriptor: TypedPropertyDescriptor<(...args: any[]) => any>) {
    const method = descriptor.value as (...args: any[]) => any

    const newMethod = function (...args: any[]) {
      // tslint:disable-next-line: no-invalid-this
      if (!this.store) {
        return
      }
      // tslint:disable-next-line: no-invalid-this
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
      },
    )
    return descriptor
  }
}

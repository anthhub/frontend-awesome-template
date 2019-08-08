export function throttleDecorator(delay = 0) {
  return function (this: any, _target: any, _propertyKey: string, descriptor: TypedPropertyDescriptor<(...args: any[]) => any>) {
    const method = descriptor.value as (...args: any[]) => any

    let lastTime = 0
    const newMethod = function (this: any, ...args: any[]) {
      const nowTime = Date.now()
      if (nowTime - lastTime > delay) {
        method.apply(this, args)
        lastTime = nowTime
      }
    }

    descriptor.value = newMethod

    return descriptor
  }
}

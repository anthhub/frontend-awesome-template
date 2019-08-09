export function debounceDecorator(delay = 0) {
  return function (this: any, _target: any, _propertyKey: string, descriptor: TypedPropertyDescriptor<(...args: any[]) => any>) {
    const method = descriptor.value as (...args: any[]) => any
    let timer: any = null

    const newMethod = function (this: any, ...args: any[]) {
      clearTimeout(timer)

      timer = setTimeout(() => {
        method.apply(this, args)
      }, delay)
    }

    descriptor.value = newMethod

    return descriptor
  }
}

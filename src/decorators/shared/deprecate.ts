export function deprecate(msg = '') {
  return function (this: any, _target: any, _propertyKey: string, descriptor: TypedPropertyDescriptor<(...args: any[]) => any>) {
    const method = descriptor.value as (...args: any[]) => any

    const newMethod = function (this: any, ...args: any[]) {
      console.warn(`The ${_propertyKey} method in the ${_target.constructor.name} class has deprecated, please avoid using it sequentially!`)
      console.warn(msg)

      return method.apply(this, args)
    }

    descriptor.value = newMethod
    return descriptor
  }
}

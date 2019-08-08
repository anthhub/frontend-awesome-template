export function disabledTillEnd() {
  return function (this: any, _target: any, _propertyKey: string, descriptor: TypedPropertyDescriptor<(...args: any[]) => any>) {
    const method = descriptor.value as (...args: any[]) => any

    let disable = false

    const newMethod = async function (this: any, ...args: any[]) {
      if (disable) {
        return
      }

      disable = true

      const value = await method.apply(this, args)

      disable = false

      return value
    }

    descriptor.value = newMethod
    return descriptor
  }
}

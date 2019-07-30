// // 函数开始和结束加入钩子
export function startToEnd(startFn?: (any?) => any, endFn?: (any?) => any) {
  // tslint:disable-next-line: only-arrow-functions
  return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<(any?) => any>) {
    const method = descriptor.value
    // tslint:disable-next-line: only-arrow-functions
    descriptor.value = async function () {
      // tslint:disable-next-line: no-invalid-this
      startFn && (await startFn(this))
      try {
        // tslint:disable-next-line: no-invalid-this
        return await method.call(this, arguments[0], arguments[1])
      } catch (e) {
        throw e
      } finally {
        // tslint:disable-next-line: no-invalid-this
        endFn && (await endFn(this))
      }
    }
    return descriptor
  }
}

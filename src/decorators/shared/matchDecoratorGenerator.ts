// 装饰器包装器
export const matchDecoratorGenerator = (decorator: any, match: IdentifyClassType) => {
  // return decorator(WrappedClass)

  return function<T extends new (...args: any[]) => any>(this: any, WrappedComponent: T) {
    if ((WrappedComponent as any).$$identifyClassType !== match) {
      return (arg: any) => arg
    }

    return decorator
  }
}

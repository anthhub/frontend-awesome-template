// 装饰器包装器
export function matchDecoratorGenerator(decorator: any, match: IdentifyClassType[]) {
  return function<T extends new (...args: any[]) => any>(this: any, WrappedComponent: T) {
    if (match.includes('All') || match.includes((WrappedComponent as any).$$identifyClassType)) {
      return decorator
    }
    return (arg: any) => arg
  }
}

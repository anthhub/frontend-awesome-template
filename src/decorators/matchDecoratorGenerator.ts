// 装饰器包装器

export function matchDecoratorGenerator(decorator: any, match: IdentifyClassType[]) {
  let flag = false
  return function<T extends new (...args: any[]) => any>(this: any, WrappedComponent: T) {
    class Temp extends WrappedComponent {
      constructor(...args: any[]) {
        super(...args)

        if (match.includes('All') || match.includes((WrappedComponent as any).$$identifyClassType)) {
          flag = true
        }
      }
    }

    // tslint:disable-next-line: no-unused-expression
    new Temp()

    if (flag) {
      return decorator(WrappedComponent)
    }
    return WrappedComponent
  }
}

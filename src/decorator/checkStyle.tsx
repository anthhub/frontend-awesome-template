export default function checkStyle<T extends new (...args: any[]) => any>(WrappedComponent: T) {
  return class extends WrappedComponent {
    constructor(...args: any[]) {
      super(...args)

      console.log('%c%s', 'color: #20bd08;font-size:15px', '===TQY===: extends -> storeEnhancer -> super', Object.values(this), this)
    }
  }
}

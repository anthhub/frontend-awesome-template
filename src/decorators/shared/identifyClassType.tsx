export default function identifyClassType<T extends new (...args: any[]) => any>(WrappedComponent: T) {
  return class extends WrappedComponent {
    protected $$identifyClassType: '$$store' | '$$pureComp' | '$$connectedStoreComp' | '$$pageComp' | null = null

    constructor(...args: any[]) {
      super(...args)

      if (this.updater) {
        this.$$identifyClassType = '$$store'
      } else if (this.config) {
        this.$$identifyClassType = '$$pageComp'
      } else if (this.config) {
        this.$$identifyClassType = '$$pageComp'
      }

      console.log('%c%s', 'color: #e30aee;font-size:15px', '===TQY===: extends -> constructor -> this', this)
    }
  }
}

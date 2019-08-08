export default function identifyClassType<T extends new (...args: any[]) => any>(WrappedComponent: T) {
  return class extends WrappedComponent {
    protected $$myType: '$$store' | '$$pureComp' | '$$connectedStoreComp' | '$$pageComp' | null = null

    constructor(...args: any[]) {
      super(...args)

      if (this.updater) {
        this.$$myType = '$$store'
      }

      if (this.config) {
        this.$$myType = '$$pageComp'
      }

      console.log('%c%s', 'color: #e30aee;font-size:15px', '===TQY===: extends -> constructor -> this', this)
    }
  }
}

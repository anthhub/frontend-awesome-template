export default function identifyClassType<T extends new (...args: any[]) => any>(WrappedComponent: T) {
  return class IdentifyClassTypeClass extends WrappedComponent {
    static $$identifyClassType: IdentifyClassType = null

    constructor(...args: any[]) {
      super(...args)

      if (this.updater) {
        IdentifyClassTypeClass.$$identifyClassType = '$$store'
      } else if (this.config) {
        IdentifyClassTypeClass.$$identifyClassType = '$$pageComp'
      } else if (this.config) {
        IdentifyClassTypeClass.$$identifyClassType = '$$pageComp'
      }

      console.log('%c%s', 'color: #e30aee;font-size:15px', '===TQY===: extends -> constructor -> this', this)
    }
  }
}

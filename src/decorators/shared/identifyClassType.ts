export default function identifyClassType<T extends new (...args: any[]) => any>(WrappedComponent: T) {
  return class IdentifyClassTypeClass extends WrappedComponent {
    static $$identifyClassType: IdentifyClassType = null

    constructor(...args: any[]) {
      super(...args)

      if (this.config) {
        IdentifyClassTypeClass.$$identifyClassType = 'Page'
      }
    }
  }
}

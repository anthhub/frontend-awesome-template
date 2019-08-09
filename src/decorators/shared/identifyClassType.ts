export default function identifyClassType<T extends new (...args: any[]) => any>(WrappedComponent: T) {
  return class IdentifyClassTypeClass extends WrappedComponent {
    static $$identifyClassType: IdentifyClassType = null

    constructor(...args: any[]) {
      super(...args)
      console.log('%c%s', 'color: #20bd08;font-size:15px', '===TQY===: defaultfunctionidentifyClassType<Textendsnew -> WrappedComponent', WrappedComponent)

      if (this.config) {
        IdentifyClassTypeClass.$$identifyClassType = 'Page'
      }
    }
  }
}

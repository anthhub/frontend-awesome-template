export default function checkDefaultProps<T extends new (...args: any[]) => any>(WrappedComponent: T) {
  return class extends WrappedComponent {
    constructor(...args: any[]) {
      super(...args)
      console.log('%c%s', 'color: #20bd08;font-size:15px', '===TQY===: extends -> constructor -> super', this, this.$componentType)

      if (!(WrappedComponent as any).defaultProps) {
        throw Error('The component must have static defaultProps property!')
      }
    }
  }
}

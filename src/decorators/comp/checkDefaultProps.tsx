export default function checkDefaultProps<T extends new (...args: any[]) => any>(WrappedComponent: T) {
  return class extends WrappedComponent {
    constructor(...args: any[]) {
      super(...args)

      if (!(WrappedComponent as any).defaultProps) {
        throw Error('The component must have static defaultProps property!')
      }
    }
  }
}

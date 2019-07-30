import rootStore from '@store'

export default function extendsProps<T extends new (...args: any[]) => any>(WrappedComponent: T) {
  return class extends WrappedComponent {
    constructor(..._args: any[]) {
      super(rootStore)
    }
  }
}

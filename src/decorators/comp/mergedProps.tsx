import { objMerge } from '@lib/utils/object'

export default function mergedProps<T extends new (...args: any[]) => any>(WrappedComponent: T) {
  return class extends WrappedComponent {
    get mergedProps() {
      return objMerge(this.props, (WrappedComponent as any).defaultProps)
    }
  }
}

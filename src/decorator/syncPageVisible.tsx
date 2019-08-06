import router from '@application/router'
import { PageCompExt } from '@lib/extent/comp'

export default function syncPageVisible<T extends new (...args: any[]) => PageCompExt>(WrappedComponent: T) {
  return class extends WrappedComponent {
    componentDidShow() {
      if (super.componentDidShow) {
        super.componentDidShow()
      }
    }

    componentDidHide() {
      if (super.componentDidShow) {
        super.componentDidShow()
      }
      router.syncPageVisible(null)
    }
  }
}

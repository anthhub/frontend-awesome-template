import router from '@application/router'
import { PageCompExt } from '@lib/extent/comp'

export default function syncRoutes<T extends new (...args: any[]) => PageCompExt>(WrappedComponent: T) {
  return class extends WrappedComponent {
    componentDidShow() {
      router.syncRoutes()
      if (super.componentDidShow) {
        super.componentDidShow()
      }
    }
  }
}

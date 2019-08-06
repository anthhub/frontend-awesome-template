import router from '@application/router'
import { Pages } from '@route'

import { reaction } from 'mobx'

/**
 * 监听路由
 */
export function watchPageVisible(page: Pages, visible: 'show' | 'hide' | 'always' = 'show') {
  return function (this: any, target: any, _propertyKey: string, descriptor: TypedPropertyDescriptor<(...args: any[]) => any>) {
    const method = descriptor.value as (...args: any[]) => any

    const newMethod = function (this: any, ...args: any[]) {
      return method.apply(this, args)
    }

    descriptor.value = newMethod

    reaction(
      () => router.pageVisible,
      pageVisible => {
        if (page !== router.curPage) {
          return
        }

        if (pageVisible === page && (visible === 'show' || visible === 'always')) {
          return newMethod.apply(target, [pageVisible])
        }
        if (!pageVisible && (visible === 'hide' || visible === 'always')) {
          return newMethod.apply(target, [pageVisible])
        }
      },
    )

    return descriptor
  }
}

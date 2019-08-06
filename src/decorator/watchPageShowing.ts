import router from '@application/router'
import { Pages } from '@route'

import { reaction } from 'mobx'

/**
 * 监听路由
 */
export function watchPageShowing(page: Pages, showing: 'show' | 'hide' | 'always' = 'show') {
  return function (this: any, target: any, _propertyKey: string, descriptor: TypedPropertyDescriptor<(...args: any[]) => any>) {
    const method = descriptor.value as (...args: any[]) => any

    const newMethod = function (this: any, ...args: any[]) {
      return method.apply(this, args)
    }

    descriptor.value = newMethod

    reaction(
      () => router.pageShowing === page,
      flag => {
        if (!flag) {
          return
        }
        if (router.pageShowing && (showing === 'show' || showing === 'always')) {
          return newMethod.apply(target, [flag])
        }
        if (!router.pageShowing && (showing === 'hide' || showing === 'always')) {
          return newMethod.apply(target, [flag])
        }
      },
    )

    return descriptor
  }
}

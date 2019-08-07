import router from '@context/router'
import { Pages } from '@route'

import { reaction } from 'mobx'

/**
 * 监听路由
 */
export function watchRoute(page: Pages, direction: 'forword' | 'back' | 'always' = 'forword', backParamsCb: (ins: any) => any) {
  return function (this: any, target: any, _propertyKey: string, descriptor: TypedPropertyDescriptor<(...args: any[]) => any>) {
    const method = descriptor.value as (...args: any[]) => any

    const newMethod = function (this: any, ...args: any[]) {
      return method.apply(this, args)
    }

    descriptor.value = newMethod

    if (backParamsCb) {
      reaction(
        () => backParamsCb(target),
        backParams => {
          router.backParamsMap[page] = { ...router.backParamsMap[page], ...backParams }
        }
      )
    }

    reaction(
      () => router.curUrl,
      () => {
        const flag = router.curPage === page

        if (!flag) {
          return
        }
        if (router.isForward && (direction === 'forword' || direction === 'always')) {
          return newMethod.apply(target, [flag])
        }
        if (!router.isForward && (direction === 'back' || direction === 'always')) {
          return newMethod.apply(target, [flag])
        }
      }
    )

    return descriptor
  }
}

import router from '@application/router'
import { Pages } from '@route'

import { reaction } from 'mobx'

/**
 * 监听路由
 */
export function watchRoute(page: Pages, direction: 'forword' | 'back' | 'always' = 'forword', backParamsCb: (ins: any) => any) {
  // tslint:disable-next-line: only-arrow-functions
  return function (target: any, _propertyKey: string, descriptor: TypedPropertyDescriptor<(...args: any[]) => any>) {
    const method = descriptor.value as (...args: any[]) => any

    const newMethod = function (...args: any[]) {
      // tslint:disable-next-line: no-invalid-this
      return method.apply(this, args)
    }

    descriptor.value = newMethod

    if (backParamsCb) {
      reaction(
        () => backParamsCb(target),
        backParams => {
          router.backParamsMap[page] = { ...router.backParamsMap[page], ...backParams }
        },
      )
    }

    reaction(
      () => router.curPage === page,
      flag => {
        if (!flag) {
          return
        }
        if (router.isForward && (direction === 'forword' || direction === 'always')) {
          return newMethod.apply(target, [flag])
        }
        if (!router.isForward && (direction === 'back' || direction === 'always')) {
          return newMethod.apply(target, [flag])
        }
      },
    )

    return descriptor
  }
}

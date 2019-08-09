import { compose } from 'tank-utils'

import { inject, observer } from '@tarojs/mobx'

import checkEffects from './shared/checkEffects'

import checkDefaultProps from './comp/checkDefaultProps'
import mergedProps from './comp/mergedProps'
import syncPageVisible from './comp/syncPageVisible'
import syncRoutes from './comp/syncRoutes'
import { matchDecoratorGenerator } from './matchDecoratorGenerator'
import identifyClassType from './shared/identifyClassType'

// export const pageEnhancer = compose(
//   inject((it: any) => it as any),
//   observer,
//   syncPageVisible,
//   syncRoutes,
//   checkDefaultProps,
//   identifyClassType
// )

// export const pageCompEnhancer = compose(
//   inject((it: any) => it as any),
//   observer,
//   mergedProps
//   // checkDefaultProps,
//   // identifyClassType
// )

// export const compEnhancer = compose(
//   mergedProps,
//   // checkDefaultProps,
//   identifyClassType
// )

// export const storeEnhancer = compose(
//   matchDecoratorGenerator(checkEffects, ['Store'])
//   // identifyClassType
// )

// 从下往上
const funcDecorators = [
  matchDecoratorGenerator(inject((it: any) => it as any), ['Page', 'PageComp']),
  matchDecoratorGenerator(observer, ['Page', 'PageComp']),
  matchDecoratorGenerator(mergedProps, ['PageComp', 'PureComp']),
]

// 从下往上
const checkDecorators = [matchDecoratorGenerator(checkDefaultProps, ['PageComp', 'PureComp']), matchDecoratorGenerator(checkEffects, ['Store'])]

export const allEnhancer = compose(
  ...funcDecorators,
  ...checkDecorators,
  identifyClassType
)

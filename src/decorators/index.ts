import { compose } from 'tank-utils'

import { inject, observer } from '@tarojs/mobx'

import checkStyle from './shared/checkStyle'

import mergedProps from './comp/mergedProps'
import syncPageVisible from './comp/syncPageVisible'
import syncRoutes from './comp/syncRoutes'
import identifyClassType from './shared/identifyClassType'
import { matchDecoratorGenerator } from './shared/matchDecoratorGenerator'

export const pageEnhancer = compose(
  inject((it: any) => it as any),
  observer,
  syncPageVisible,
  syncRoutes,
  // checkDefaultProps,
  identifyClassType
)

export const pageCompEnhancer = compose(
  inject((it: any) => it as any),
  observer,
  mergedProps
  // checkDefaultProps,
  // identifyClassType
)

export const compEnhancer = compose(
  mergedProps,
  // checkDefaultProps,
  identifyClassType
)

export const storeEnhancer = compose(
  matchDecoratorGenerator(checkStyle, '$$store')
  // identifyClassType
)

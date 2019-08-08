import { compose } from 'tank-utils'

import { inject, observer } from '@tarojs/mobx'

import checkDefaultProps from './comp/checkDefaultProps'

import checkStyle from './shared/checkStyle'

import mergedProps from './comp/mergedProps'
import syncPageVisible from './comp/syncPageVisible'
import syncRoutes from './comp/syncRoutes'
import identifyClassType from './shared/identifyClassType'

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
  observer
  // checkDefaultProps,
  // identifyClassType
)

export const compEnhancer = compose(
  mergedProps,
  // checkDefaultProps,
  identifyClassType
)

export const storeEnhancer = compose(
  checkStyle
  // identifyClassType
)

import { compose } from 'tank-utils'

import { inject, observer } from '@tarojs/mobx'

import checkDefaultProps from './comp/checkDefaultProps'

import checkStyle from './shared/checkStyle'

import mergedProps from './comp/mergedProps'
import syncRoutes from './comp/syncRoutes'
import syncPageVisible from './store/syncPageVisible'

export const pageEnhancer = compose(
  inject((it: any) => it as any),
  observer,
  syncPageVisible,
  syncRoutes,
  checkDefaultProps
)

export const pageCompEnhancer = compose(
  inject((it: any) => it as any),
  observer,
  checkDefaultProps
)

export const compEnhancer = compose(
  mergedProps,
  checkDefaultProps
)

export const storeEnhancer = compose(checkStyle)

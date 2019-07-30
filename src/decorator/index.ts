import { compose } from 'tank-utils'

import { inject, observer } from '@tarojs/mobx'

import checkDefaultProps from './checkDefaultProps'

import extendsProps from './extendsProps'
import mergedProps from './mergedProps'
import syncRoutes from './syncRoutes'

export const pageEnhancer = compose(
  inject((it: any) => it as any),
  observer,
  syncRoutes,
  checkDefaultProps,
)

export const pageCompEnhancer = compose(
  inject((it: any) => it as any),
  observer,
  checkDefaultProps,
)

export const compEnhancer = compose(
  mergedProps,
  checkDefaultProps,
)

export const storeEnhancer = compose()

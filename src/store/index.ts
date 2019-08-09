import { default as StoreExt } from '@lib/extent/store'
import { default as counterStore } from './counter'

import { default as loginStore } from './index/index'
import { default as viewStore } from './view/index'

const rootStore = {  loginStore, counterStore, viewStore }

StoreExt.rootStore = rootStore

export type RootStore = typeof rootStore

export default rootStore

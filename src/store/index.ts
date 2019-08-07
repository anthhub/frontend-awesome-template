import { default as StoreExt } from '@lib/extent/store'
import { default as counterStore } from './counter'
import { default as homeStore } from './home'
import { default as loginStore } from './index/index'
import { default as viewStore } from './view/index'

const rootStore = { homeStore, loginStore, counterStore, viewStore }

StoreExt.rootStore = rootStore

export type RootStore = typeof rootStore

export default rootStore

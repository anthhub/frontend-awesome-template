// import StoreExt from '@lib/extent/store'
import StoreExt from '@lib/extent/store'
import { default as counterStore } from './counter'
import { default as homeStore } from './home'
import { default as loginStore } from './index/index'

const rootStore = { homeStore, loginStore, counterStore }

StoreExt.rootStore = rootStore

export type RootStore = typeof rootStore

export default rootStore

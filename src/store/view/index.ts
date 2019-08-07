import { storeEnhancer } from '@decorators'
import StoreExt from '@lib/extent/store'
import { observable } from 'mobx'

@storeEnhancer
class ViewStore extends StoreExt<ViewStore> {
  @observable showSkeleton = false
}

export default new ViewStore()

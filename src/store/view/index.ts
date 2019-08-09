import { allEnhancer } from '@decorators'
import StoreExt from '@lib/extent/store'
import { observable } from 'mobx'

@allEnhancer
class ViewStore extends StoreExt<ViewStore> {
  @observable showSkeleton = false
}

export default new ViewStore()

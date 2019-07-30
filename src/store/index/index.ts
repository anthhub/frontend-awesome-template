import { storeEnhancer } from '@decorator'
// import { watchProps } from '@decorator/watchProps'
import { watchRoute } from '@decorator/watchRoute'
import StoreExt from '@lib/extent/store'
import { observable } from 'mobx'

@storeEnhancer
class IndexStore extends StoreExt {
  @observable counter = 4

  // @watchRoute('index', 'always', (ins: any) => {
  //   return { a: ins.counter }
  // })
  // add() {
  //   console.log('%c%s', 'color: #20bd08;font-size:15px', '===TQY===: IndexStore11111111111111 -> ins', this)
  // }

  // @watchProps(ins => {
  //   console.log('%c%s', 'color: #20bd08;font-size:15px', '===TQY===: IndexStore -> ins', ins)
  // })
  // add() {
  //   console.log('%c%s', 'color: #20bd08;font-size:15px', '===TQY===: IndexStore -> ins', this)
  // }
}

export default new IndexStore()

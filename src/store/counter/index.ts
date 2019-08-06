import { storeEnhancer } from '@decorator'
import { controlLoading } from '@decorator/controlLoading'
import { watchPageVisible } from '@decorator/watchPageVisible'
import { watchRoute } from '@decorator/watchRoute'
import StoreExt from '@lib/extent/store'
import { action, observable, runInAction } from 'mobx'
import { wait } from 'tank-utils'

@storeEnhancer
class CounterStore extends StoreExt<CounterStore> {
  @observable counter = 0

  @observable text = ''

  @observable object = {}

  // @action
  // increment() {
  //   this.counter++

  //   this.setProps({ counter: 1 })
  // }

  // @action
  // decrement() {
  //   this.counter--
  // }

  @controlLoading()
  async incrementAsync() {
    await wait(3000)

    // setTimeout(() => {
    //   runInAction(() => this.counter++)
    // }, 1000)
  }

  @watchRoute('index', 'always', (ins: any) => ({ a: ins.counter }))
  sub(aaaaaaaa = 333333344444) {
    console.log('%c%s', 'color: #20bd08;font-size:15px', '===TQY===: IndexStore11111111111111 -> ins', aaaaaaaa, this)
  }

  @watchRoute('index', 'always', (ins: any) => ({ b: ins.counter + 1 }))
  xxxx(aaaaaaaa = 333333344444) {
    console.log('%c%s', 'color: #20bd08;font-size:15px', '===TQY===: IndexStore11111111111111 -> ins', aaaaaaaa, this)
  }

  @watchPageVisible('index', 'always')
  add(aaaaaaaa = 333333344444) {
    console.log('%c%s', 'color: #20bd08;font-size:15px', '===TQY===: CounterStore -> add -> add watchPageShowing index', aaaaaaaa, this.counter)
  }
}

export default new CounterStore()

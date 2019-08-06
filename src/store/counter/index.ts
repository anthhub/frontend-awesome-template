import { storeEnhancer } from '@decorator'
import { watchPageShowing } from '@decorator/watchPageShowing'
import { watchProps } from '@decorator/watchProps'
import { watchRoute } from '@decorator/watchRoute'
import StoreExt from '@lib/extent/store'
import { action, observable, runInAction } from 'mobx'

@storeEnhancer
class CounterStore extends StoreExt<CounterStore> {
  @observable counter = 0

  @observable text = ''

  // @action
  // increment() {
  //   this.counter++

  //   this.setProps({ counter: 1 })
  // }

  // @action
  // decrement() {
  //   this.counter--
  // }

  @action
  incrementAsync() {
    setTimeout(() => {
      runInAction(() => this.counter++)
    }, 1000)
  }

  @watchRoute('index', 'always', (ins: any) => ({ a: ins.counter }))
  sub(aaaaaaaa = 333333344444) {
    console.log('%c%s', 'color: #20bd08;font-size:15px', '===TQY===: IndexStore11111111111111 -> ins', aaaaaaaa, this)
  }

  @watchRoute('index', 'always', (ins: any) => ({ b: ins.counter + 1 }))
  xxxx(aaaaaaaa = 333333344444) {
    console.log('%c%s', 'color: #20bd08;font-size:15px', '===TQY===: IndexStore11111111111111 -> ins', aaaaaaaa, this)
  }

  @watchPageShowing('index')
  add(aaaaaaaa = 333333344444) {
    console.log('%c%s', 'color: #20bd08;font-size:15px', '===TQY===: CounterStore -> add -> add watchPageShowing index', aaaaaaaa, this.counter)
  }
}

export default new CounterStore()

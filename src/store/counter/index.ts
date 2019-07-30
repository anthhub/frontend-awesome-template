import { storeEnhancer } from '@decorator'
import { watchProps } from '@decorator/watchProps'
import { watchRoute } from '@decorator/watchRoute'
import StoreExt from '@lib/extent/store'
import { action, observable, runInAction } from 'mobx'

@storeEnhancer
class CounterStore extends StoreExt {
  @observable counter = 0

  @action
  increment() {
    this.counter++
  }

  @action
  decrement() {
    this.counter--
  }

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

  @watchProps(ins => ins.counter)
  add(aaaaaaaa = 333333344444) {
    console.log('%c%s', 'color: #20bd08;font-size:15px', '===TQY===: CounterStore -> add -> add aaaaaaaa', aaaaaaaa, this.counter)
  }
}

export default new CounterStore()

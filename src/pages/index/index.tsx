import { Button, Text, View } from '@tarojs/components'
import Taro, { Config } from '@tarojs/taro'

import { pageEnhancer } from '@decorator'
import { PageCompExt } from '@lib/extent/comp'

import './index.scss'

@pageEnhancer
class Index extends PageCompExt {
  static defaultProps = {}

  config: Config = {
    navigationBarTitleText: '第二页',
  }

  componentWillReact() {
    console.log('componentWillReact')
  }

  async increment() {
    const a: any = 1

    const {
      counterStore: { setProps: counterStoreSet, counter },
    } = this.props
    counterStoreSet({ counter: counter + 1, text: counter + 1 + '2' })
    counterStoreSet(store => ({ counter: store.counter + 10, text: store.counter + 10 + '2' }))
    counterStoreSet({ counter: counter + 10, text: counter + 10 + '2' })
    counterStoreSet({ counter: counter + 100, text: counter + 100 + '2' })

    // counterStore.increment()
  }

  decrement() {
    const { counterStore } = this.props
    // counterStore.decrement()
  }

  incrementAsync() {
    const { counterStore } = this.props
    counterStore.incrementAsync()
  }

  render() {
    console.log('%c%s', 'color: #20bd08;font-size:15px', '===TQY===: Index -> render -> render', '第三页render第三页render第三页render')
    const {
      counterStore: { counter },
    } = this.props

    return (
      <View className="index">
        <Button onClick={this.increment}>+</Button>
        <Button onClick={this.decrement}>-</Button>
        <Button onClick={this.incrementAsync}>Add Async</Button>
        <Text>{counter}</Text>
        <Button onClick={() => this.app.router.navigateTo('login')}> 第三页 </Button>
      </View>
    )
  }
}

export default Index

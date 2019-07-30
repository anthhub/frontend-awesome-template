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

  increment() {
    const a: any = 1

    const {
      counterStore: { setProps: counterStoreRest },
    } = this.props
    counterStoreRest({ counter: 1, text: '' })
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

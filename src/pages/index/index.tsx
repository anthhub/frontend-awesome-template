import { Button, Text, View } from '@tarojs/components'
import Taro, { Config } from '@tarojs/taro'

import { allEnhancer } from '@decorators'
import { PageCompExt } from '@lib/extent/comp'

import SkeletonWarpper from '@container/SkeletonWarpper'

import { controlLoading } from '@decorators/shared/controlLoading'
import { deprecate } from '@decorators/shared/deprecate'
import { disabledTillEnd } from '@decorators/shared/disabledTillEnd'
// import { throttleDecorator } from '@decorators/shared/throttleDecorator'
import './index.scss'

@allEnhancer
class Index extends PageCompExt {
  static defaultProps = {}

  config: Config = {
    navigationBarTitleText: '第二页',
  }

  componentWillReact() {
    console.log('componentWillReact')
  }

  @deprecate('1000')
  async increment() {
    const {
      counterStore: { setProps: counterStoreSet, counter },
    } = this.props
    counterStoreSet({ counter: counter + 1, text: counter + 1 + '2' })
    // counterStoreSet(store => ({ counter: store.counter + 10, text: store.counter + 10 + '2' }))
    // counterStoreSet({ counter: counter + 10, text: counter + 10 + '2' })
    // counterStoreSet({ counter: counter + 100, text: counter + 100 + '2' })

    // counterStore.increment()
  }

  decrement() {
    const {
      counterStore: { dispatch },
    } = this.props
    dispatch({ type: '' })
    // counterStore.decrement()
  }

  @controlLoading('skeleton')
  async incrementAsync() {
    const { counterStore } = this.props

    await counterStore.incrementAsync()
  }

  render() {
    console.log('%c%s', 'color: #20bd08;font-size:15px', '===TQY===: Index -> render -> render', '第二页')

    const {
      counterStore: { counter },
    } = this.props

    return (
      // <SkeletonWarpper>
      <View className="index">
        <Button onClick={this.increment}>+</Button>
        <Button onClick={this.decrement}>-</Button>
        <Button onClick={this.incrementAsync}>Add Async</Button>
        <Text>{counter}</Text>
        <Button onClick={() => this.ctx.router.navigateTo('login')}> 第三页 </Button>
      </View>
      // </SkeletonWarpper>
    )
  }
}

export default Index

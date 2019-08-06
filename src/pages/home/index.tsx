import { Button, Text, View } from '@tarojs/components'
import Taro, { Config } from '@tarojs/taro'

import { pageEnhancer } from '@decorator'
import { PageCompExt } from '@lib/extent/comp'

import './index.scss'

@pageEnhancer
class Index extends PageCompExt {
  static defaultProps = { xx: 1 }

  state = { a: 1 }

  config: Config = {
    navigationBarTitleText: '第一页',
  }

  componentWillReact() {
    console.log('componentWillReact')
  }

  increment() {
    this.app.router.navigateTo('index')

    this.setState({ a: 1, b: 1 })
  }

  render() {
    console.log('%c%s', 'color: #20bd08;font-size:15px', '===TQY===: Index -> render -> rendermergedProps', '第一页', this.mergedProps.counterStore.object)
    return (
      <View className="index">
        <Button onClick={this.increment}>+</Button>
      </View>
    )
  }
}

export default Index

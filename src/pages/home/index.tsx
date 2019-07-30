import { Button, Text, View } from '@tarojs/components'
import Taro, { Config } from '@tarojs/taro'

import { pageEnhancer } from '@decorator'
import { PageCompExt } from '@lib/extent/comp'

import './index.scss'

@pageEnhancer
class Index extends PageCompExt {
  static defaultProps = {}

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
    return (
      <View className="index">
        <Button onClick={this.increment}>+</Button>
      </View>
    )
  }
}

export default Index

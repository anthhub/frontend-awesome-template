import { Button, Text, View } from '@tarojs/components'
import Taro, { Config } from '@tarojs/taro'

import { pageEnhancer } from '@decorator'
import { PageCompExt } from '@lib/extent/comp'

import './index.scss'

@pageEnhancer
class Index extends PageCompExt {
  static defaultProps = {}

  config: Config = {
    navigationBarTitleText: '第一页',
  }

  componentWillReact() {
    console.log('componentWillReact')
  }

  increment() {
    this.app.router.navigateTo('index')
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

import { Button, Text, View } from '@tarojs/components'
import Taro, { Config } from '@tarojs/taro'

import { pageEnhancer } from '@decorator'
import { PageCompExt } from '@lib/extent/comp'

import './index.scss'

@pageEnhancer
class Index extends PageCompExt {
  static defaultProps = {}

  config: Config = {
    navigationBarTitleText: '第三页',
  }

  render() {
    const {
      counterStore: { counter },
    } = this.props

    return (
      <View className="index">
        <Text>{counter}</Text>
      </View>
    )
  }
}

export default Index

import { Button, Text, View } from '@tarojs/components'
import Taro, { Config } from '@tarojs/taro'

import { pageEnhancer } from '@decorator'
import { PageCompExt } from '@lib/extent/comp'

import SkeletonWarpper from '@container/SkeletonWarpper'
import './index.scss'

@pageEnhancer
class Index extends PageCompExt {
  static defaultProps = {}

  config: Config = {
    navigationBarTitleText: '第三页',
  }

  render() {
    console.log('%c%s', 'color: #20bd08;font-size:15px', '===TQY===: Index -> render -> render', '第三页')
    const {
      counterStore: { counter },
    } = this.props

    return (
      <SkeletonWarpper>
        <View className="index">
          <Text>{counter}</Text>
        </View>
      </SkeletonWarpper>
    )
  }
}

export default Index

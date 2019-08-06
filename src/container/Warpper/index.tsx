import './index.scss'

import Loading from '@components/Loading'
import { PageCompExt } from '@lib/extent/comp'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'

import { pageCompEnhancer } from '@decorator'

@pageCompEnhancer
class Warpper extends PageCompExt {
  static defaultProps = {}

  render() {
    const {
      viewStore: { showSkeleton },
    } = this.props
    console.log('%c%s', 'color: #20bd08;font-size:15px', '===TQY===: Warpper -> render -> showSkeleton', showSkeleton)
    return (
      <View className="warpper">
        <View className={`curtain ${showSkeleton ? '' : 'hide'} `}>
          <View className="loader">
            <Loading />
          </View>
        </View>

        {this.props.children}
      </View>
    )
  }
}

export default Warpper

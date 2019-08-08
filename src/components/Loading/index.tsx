import './index.scss'

import { compEnhancer } from '@decorators'
import { View } from '@tarojs/components'
import Taro, { Component } from '@tarojs/taro'

let timerID: any
interface IProps {}

@compEnhancer
class Loading extends Component<IProps> {
  state = {
    currentPage: 0,
  }
  // 小圆点加载
  componentDidMount() {
    timerID = setInterval(() => this.func(), 500)
  }
  componentWillUnmount() {
    clearInterval(timerID)
  }

  func() {
    this.setState(
      {
        currentPage: this.state.currentPage + 1,
      },
      () => {
        if (this.state.currentPage === 2) {
          this.state.currentPage = -1
        }
      }
    )
  }

  render() {
    return (
      <View className="loading">
        <View className="spinner">
          <View className="rect rect1" />
          <View className="rect rect2" />
          <View className="rect rect3" />
        </View>
      </View>
    )
  }
}

export default Loading

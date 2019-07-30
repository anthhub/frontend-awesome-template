import '@tarojs/async-await'
import { onError, Provider } from '@tarojs/mobx'
import Taro, { Component, Config } from '@tarojs/taro'
import { configure } from 'mobx'

import rootStore from './store'

import './styles/base.scss'
configure({ enforceActions: 'observed' })
onError((error: Error) => {
  console.log('mobx global error listener:', error)
})

class App extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: ['pages/home/index', 'pages/index/index', 'pages/login/index'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
    },
  }

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Provider store={rootStore} />
  }
}

Taro.render(<App />, document.getElementById('app'))

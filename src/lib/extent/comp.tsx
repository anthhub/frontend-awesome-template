import { compApplication } from '@application'
import { Component } from '@tarojs/taro'

export default abstract class CompExt<P = {}, S = {}> extends Component<P, S> {
  protected get mergedProps() {
    return this.props
  }

  static options = {
    addGlobalClass: true,
  }

  protected readonly app = compApplication

  setState<K extends keyof S>(state: ((prevState: Readonly<S>, props: P) => Pick<S, K> | S) | (Pick<S, K> | S), callback?: () => any): Promise<S> {
    return new Promise(resolve => {
      super.setState(state, async () => {
        if (callback) {
          await callback()
        }
        resolve(this.state)
      })
    })
  }
}

export abstract class PageCompExt<P = IRootStore, S = {}> extends CompExt<P & IRootStore, S> {}

import { compCtx } from '@context'
import { Component } from '@tarojs/taro'

export default abstract class CompExt<P = {}, S = {}> extends Component<P, S> {
  protected get mergedProps() {
    return this.props
  }

  protected get router() {
    return this.ctx.router
  }

  static options = {
    addGlobalClass: true,
  }

  protected static $$identifyClassType: IdentifyClassType = 'PureComp'

  protected readonly ctx = compCtx

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

export abstract class PageCompExt<P = IRootStore, S = {}> extends CompExt<P & IRootStore, S> {
  protected static $$identifyClassType: IdentifyClassType = 'PageComp'
}

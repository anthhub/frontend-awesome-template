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
}

export abstract class PageCompExt<P = IRootStore, S = {}> extends CompExt<P & IRootStore, S> {}

import { storeApplication } from '@application'
import { default as api } from '@http'
import { action } from 'mobx'

export default abstract class StoreExt<T> {
  static rootStore: IRootStore
  protected readonly api = api
  protected readonly app = storeApplication
  protected get store() {
    return StoreExt.rootStore
  }

  // setState<K extends keyof S>(state: ((prevState: Readonly<S>, props: P) => Pick<S, K> | S) | (Pick<S, K> | S), callback?: () => any): void

  @action.bound
  setProps<K extends keyof T>(propertyObject: Pick<T, K> & IPlainObject) {
    Object.keys(propertyObject).map(key => {
      const value = propertyObject[key] as any

      if (!key) {
        throw new Error('Unuseful object!')
      }

      if (typeof value === 'function') {
        throw new Error('Forbid reseting member method of class!')
      }

      const indexer = (this as unknown) as IPlainObject
      indexer[key] = value
    })
  }
}

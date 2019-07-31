import { storeApplication } from '@application'
import { default as api } from '@http'
import { myTimeToLocal } from '@lib/utils/date'
import { action } from 'mobx'

let propsMergedQueue: any = []

export default abstract class StoreExt<T> {
  protected get store() {
    return StoreExt.rootStore
  }
  static rootStore: IRootStore
  protected readonly api = api
  protected readonly app = storeApplication

  private isBatchingUpdates = true

  @action.bound
  setProps<K extends keyof T>(propsCb: ((store: T) => Pick<T, K> & IPlainObject) | Pick<T, K> & IPlainObject) {
    this.isBatchingUpdates = false
    propsMergedQueue.push(propsCb)

    const self = (this as unknown) as T

    return new Promise(resolve => {
      setTimeout(() => {
        if (this.isBatchingUpdates) {
          return
        }
        this.isBatchingUpdates = true

        const propsMergedObject = propsMergedQueue.reduce((res: IPlainObject, cur: ((store: T) => Pick<T, K> & IPlainObject) | Pick<T, K> & IPlainObject, index: number) => {
          if (typeof cur === 'function' && index !== 0) {
            this.updater(res)
          }
          const rs = { ...res, ...(typeof cur === 'function' ? cur(self) : cur) }

          if (typeof cur === 'function' && index !== propsMergedQueue.length - 1) {
            this.updater(rs)
          }
          return rs
        }, {})

        this.updater(propsMergedObject)

        propsMergedQueue = []
        resolve()
      })
    })
  }

  @action.bound
  private updater(updaterObject: IPlainObject) {
    const indexer = (this as unknown) as IPlainObject
    console.log('%c%s', 'color: #ee7f08;font-size:15px', `===TQY===: mobx 时间旅行 ${myTimeToLocal(new Date().getTime()) + '  ' + new Date().getTime()} `, updaterObject)
    Object.keys(updaterObject).map(key => {
      const value = updaterObject[key]
      if (!key) {
        throw new Error('Unuseful object!')
      }
      if (typeof value === 'function') {
        throw new Error('Forbid reseting member method of class!')
      }
      indexer[key] = value
    })
  }
}

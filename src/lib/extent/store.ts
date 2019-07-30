import { storeApplication } from '@application'
import { default as api } from '@http'

export default abstract class StoreExt {
  static rootStore: IRootStore
  protected readonly api = api
  protected readonly app = storeApplication
  protected get store() {
    return StoreExt.rootStore
  }
}

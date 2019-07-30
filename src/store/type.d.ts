import { RootStore } from './index'

declare global {
  interface IRootStore extends RootStore {}
}

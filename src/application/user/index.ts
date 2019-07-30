import storage from '@application/storage'
import { action, computed, observable, reaction } from 'mobx'

class User {
  @computed get hasToken() {
    return !!this.userInfo.token
  }
  @computed get hasBindPhone() {
    return !!this.userInfo.phone
  }
  @computed get isLogin() {
    return this.hasToken && this.hasBindPhone
  }
  @observable userInfo: IWxUserInfo | IPlainObject = {}

  constructor() {
    this.storageToUserInfo()
    this.effects()
  }

  @action
  updateUserInfo(userInfo: IPlainObject) {
    this.userInfo = { ...this.userInfo, ...userInfo }
  }

  @action
  clearLogin() {
    storage.removeStorageSync('userInfo')
    storage.removeStorageSync('token')
  }

  @action
  private storageToUserInfo() {
    const userInfo = storage.getStorageSync('userInfo') || {}
    userInfo.token = storage.getStorageSync('token') || ''
    this.userInfo = userInfo
  }

  // 注册副作用
  private effects() {
    reaction(
      () => this.userInfo,
      userInfo => {
        storage.setStorageSync('userInfo', userInfo)
        storage.setStorageSync('token', userInfo.token || '')
      },
    )
  }
}

export default new User()

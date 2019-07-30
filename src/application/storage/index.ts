import * as Taro from '@tarojs/taro'

// 设置缓存
function setStorage(key: string, value: IPlainObject | string) {
  let params = value
  if (typeof value === 'object') {
    params = JSON.stringify(value)
  }
  return Taro.setStorage({ key, data: params })
}

// 设置缓存
function setStorageSync(key: string, value: IPlainObject | string) {
  let params = value
  if (typeof value === 'object') {
    params = JSON.stringify(value)
  }
  return Taro.setStorageSync(key, params)
}

// 读取缓存
function getStorage(key: string) {
  return (Taro.getStorage({ key }) as Promise<any>).then(data => {
    if (typeof data === 'object') {
      return JSON.parse(data)
    } else {
      return data
    }
  })
}

// 读取缓存
function getStorageSync(key: string) {
  const result = (Taro.getStorageSync(key) as unknown) as string
  try {
    return JSON.parse(result)
  } catch (error) {
    return result
  }
}

// 移除缓存
function removeStorage(key: string) {
  return Taro.removeStorage({ key })
}

// 同步移除缓存
function removeStorageSync(key: string) {
  return Taro.removeStorageSync(key)
}

export default { setStorage, getStorage, getStorageSync, removeStorage, removeStorageSync, setStorageSync }

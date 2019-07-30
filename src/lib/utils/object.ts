export function reverseObject<T extends IPlainObject>(obj: T) {
  return Object.keys(obj).reduce(
    (res, key) => {
      res[obj[key]] = key
      return res
    },
    {} as IPlainObject,
  )
}

export function objFilterNull<T>(obj: T & IPlainObject) {
  return Object.keys(obj).reduce(
    (res, key) => {
      if (obj[key] !== null && obj[key] !== undefined) {
        res[key] = obj[key]
      }
      return res
    },
    {} as IPlainObject,
  )
}

export function objMerge<U, V>(target: U & IPlainObject, source: V & IPlainObject) {
  const targetTemp = { ...target }
  // 根据source 合并
  const sourceObj: IPlainObject = Object.keys(source).reduce(
    (res, key) => {
      if (target[key] === null || target[key] === undefined) {
        res[key] = source[key]
      } else {
        // 纯对象 去递归
        if (typeof target[key] === 'object' && !Array.isArray(target[key])) {
          res[key] = objMerge(target[key], source[key])
        } else {
          res[key] = target[key]
        }
      }
      delete targetTemp[key]
      return res
    },
    {} as IPlainObject,
  )

  // 根据target 合并
  return Object.keys(targetTemp).reduce(
    (res, key) => {
      if (sourceObj[key] === null || sourceObj[key] === undefined) {
        res[key] = target[key]
      }
      return res
    },
    sourceObj as IPlainObject,
  )
}

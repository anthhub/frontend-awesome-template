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

export function compareDeep(origin: IPlainObject, target: IPlainObject) {
  // null的情况
  if (origin === null && target === null) {
    return true
  }

  if (origin === undefined && target === undefined) {
    return true
  }

  if (typeof origin !== typeof target) {
    return false
  }

  // 数组的情况; 数组可能包含对象
  if (Array.isArray(origin) && Array.isArray(target)) {
    if (origin.length !== target.length) {
      return false
    } else {
      for (let i = 0; i < origin.length; i++) {
        if (typeof origin[i] !== typeof target[i]) {
          return false
        }
        if (!compareDeep(origin[i], target[i])) {
          return false
        }
      }
      return true
    }
  }

  // 对象的情况
  if (typeof origin === 'object' && typeof target === 'object') {
    if (origin !== null && target !== null && Object.keys(origin).length !== Object.keys(target).length) {
      return false
    }
  }

  if (typeof target === 'object') {
    if (typeof origin !== 'object') {
      return false
    }
    for (const key of Object.keys(target)) {
      if (typeof origin[key] !== typeof target[key]) {
        return false
      }
      if (!compareDeep(origin[key], target[key])) {
        return false
      }
    }
    return true
  } else {
    return origin === target
  }
}

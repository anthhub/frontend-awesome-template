export function getDecodeURIQuery<T>(obj: T & IPlainObject) {
  return Object.keys(obj).reduce((res: IIndexer, key) => {
    if (obj[key] !== null && obj[key] !== 'null' && obj[key] !== undefined && obj[key] !== 'undefined') {
      res[key] = decodeURIComponent(obj[key])
    }
    return res
  }, {})
}

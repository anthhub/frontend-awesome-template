let fieldStore: IPlainObject = {}

/**
 *  实体类基类
 */
class EntityBase<T> {
  // tslint:disable-next-line: no-empty
  constructor(_props?: T) {}
}

/**
 *  实体类装饰器, 自动构建类属性, 构造函数空参赋值null
 */
function entity<T extends new (...args: any[]) => {}>(constructor: T) {
  // 闭包
  const thefieldStore = fieldStore
  fieldStore = {}

  return class extends constructor {
    constructor(...props: any[]) {
      super(...props)
      const prop = props[0]
      const indexer = (this as unknown) as IPlainObject
      Object.keys(thefieldStore).forEach(item => (indexer[item] = prop ? prop[thefieldStore[item]] : null))
      fieldStore = {}
    }
  }
}

/**
 * 字段别名装饰器,  优先级最高
 */
function fieldName(param?: string) {
  return (_target: any, key: string) => {
    fieldStore[key] = param || key
  }
}

/**
 * 字段装饰器,  声明字段
 */
function field(_target: any, key: string) {
  fieldStore[key] = key
}

export { EntityBase, entity, fieldName, field }

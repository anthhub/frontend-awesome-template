// export function logDuringTime() {
//   return function (this: any, _target: any, _propertyKey: string, descriptor: TypedPropertyDescriptor<(...args: any[]) => any>) {
//     const method = descriptor.value as (...args: any[]) => any

//     const newMethod = async function (this: any, ...args: any[]) {
//       console.log('%c%s', 'color: #20bd08;font-size:15px', '===TQY===: disabledTillEnd -> newMethod')

//       const value = await method.apply(this, args)

//       console.log('%c%s', 'color: #20bd08;font-size:15px', '===TQY===: disabledTillEnd -> value')

//       return value
//     }

//     descriptor.value = newMethod
//     return descriptor
//   }
// }

// import '@tarojs/async-await'

// import { getTokenOption, header } from '@config/config'
// import { WxLoginResult } from '@dataPool/types/user/wxLogin'
// import { objFilterNull } from '@lib/utils/object'
// import { delayToast } from '@lib/utils/ui'
// import { router, user } from '@store'
// import taro, { setStorageSync } from '@tarojs/taro'

// // response header code 2000成功 6000业务异常 4001  token过期/无效

// class Request {
//   get(url: string, data = {}) {
//     if (!Array.isArray(data)) {
//       data = objFilterNull(data)
//     }

//     return fetch({ url, data: { data, header }, method: 'GET' })
//   }

//   post(url: string, data = {}) {
//     if (!Array.isArray(data)) {
//       data = objFilterNull(data)
//     }
//     return fetch({ header: { 'content-type': 'application/json' }, url, data: { data, header }, method: 'POST' })
//   }
// }
// let requestCount = 0

// let isTokenOverdue = false
// let doingGetToken = false
// let requestQueue = []
// /**
//  * 上层请求拦截
//  */
// async function fetch(options: Taro.request.Param<IQurey<any>>) {
//   requestCount++

//   // token过期,拦截后面全部请求,返回promise
//   if (isTokenOverdue) {
//     return saveRequestPromise(options, requestQueue)
//   }

//   if (requestCount > 0) {
//     Taro.showLoading({ title: '', mask: true })
//   }

//   try {
//     // 此data是返回实体
//     const data = await req(options)

//     // 除了2000和4001 4010 4006其他都reject
//     if (!(data.header && data.header.code && [2000, 4001, 4006, 70000, 50005].includes(data.header.code))) {
//       delayToast(data.header.msg, 4000)
//       return Promise.reject(data.header.msg)
//     }

//     // 未注册去登录
//     if (data.header.code === 70000) {
//       router.navigateTo('login')
//     }

//     // 手没有绑定,要去手机绑定页
//     if ([4001, 50005].includes(data.header.code)) {
//       router.reLaunch('fillPhoneNumber')
//     }

//     // token过期 要去登录

//     if ([4001, 50005].includes(data.header.code)) {
//       router.navigateTo('login')
//       return

//       isTokenOverdue = true

//       if (!doingGetToken) {
//         doingGetToken = true
//         // 获取token,不要等待
//         getTokenByCodeToLogin()
//           .then(data => {
//             // resolve所有的promise
//             doingGetToken = isTokenOverdue = false
//             requestQueue.forEach(item => item.resolve())
//             requestQueue = []
//             return data
//           })
//           .catch(error => {
//             doingGetToken = isTokenOverdue = false
//             requestQueue.forEach(item => item.reject())
//             requestQueue = []
//             // delayToast('token获取失败')
//             router.navigateTo('login')
//             return error
//           })
//       }

//       // 把自己存起来,返回promise
//       return saveRequestPromise(options, requestQueue)
//     }

//     // 只返回内容data, 抛弃header
//     return data.data
//   } catch (error) {
//     delayToast('请求异常', 4000)
//     return Promise.reject(error)
//   } finally {
//     requestCount--
//     if (requestCount <= 0) {
//       Taro.hideLoading()
//     }
//   }
// }

// /**
//  * 保存拦截的请求
//  */
// function saveRequestPromise(options: Taro.request.Param<IQurey<any>>, requestQueue: any[]) {
//   return new Promise((resolve, reject) => requestQueue.push({ resolve, reject })).then(async () => (await req(options)).data)
// }

// /**
//  * 最底层的请求
//  */
// async function req(options: Taro.request.Param<IQurey<any>>) {
//   // 修改token
//   const token = Taro.getStorageSync('token') || ''

//   options.data.header.authToken = token

//   const { data } = await Taro.request(options)
//   return data as Promise<IResult<any>>
// }

// /**
//  * 专门直接拿code去登录的特殊方法
//  */
// export async function getTokenByCodeToLogin() {
//   const { code } = await Taro.login()

//   const data = ((await req(getTokenOption(code) as any)) as unknown) as IResult<WxLoginResult>

//   // 除了2000其他都reject
//   if (!(data.header && data.header.code && [2000].includes(data.header.code))) {
//     return Promise.reject(data.header.msg)
//   }

//   user.setUserInfo(data.data)

//   return data.data
// }

// export default new Request()

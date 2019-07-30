import { getTokenOption } from '@config/config'
import { objFilterNull } from '@lib/utils/object'
import Taro from '@tarojs/taro'
import { fetchData } from './fetch'

/**
 * 拦截器
 */

// 对象去掉null
export const filterObjectNull = async (ctx: Context, next: any) => {
  const data = ctx.req.data.data
  console.log('%c%s', 'color: #20bd08;font-size:15px', '===TQY===: filterObjectNull -> ctx.req.data.data', ctx.req)
  if (!Array.isArray(data)) {
    ctx.req.data.data = objFilterNull(data)
  }
  await next()
}

// 加上transitionId
export const addTransitionId = async (ctx: Context, next: any) => {
  ctx.req.data.header.transactionId = '222222'
  await next()
}

// 通用错误码判断
export const checkResultCode = async (ctx: Context, next: any) => {
  await next()
  const header = ctx.res.header
  if (!(header && header.code && [2000, 4001, 4006, 70000, 50005, 4407, 40002].includes(header.code))) {
    console.log('%c%s', 'color: #20bd08;font-size:15px', '===TQY===: checkResultCode -> header.msg', header.msg)
    return Promise.reject(header.msg)
  }
}

// 登录判断
export const checkLogin = async (ctx: Context, next: any) => {
  await next()
  const header = ctx.res.header
  if ([70000].includes(header.code)) {
    console.log('%c%s', 'color: #20bd08;font-size:15px', '===TQY===: checkResultCode -> header.msg', header.msg)
    return Promise.reject(header.msg)
  }
}

// 手机号判断
export const checkBindPhone = async (ctx: Context, next: any) => {
  await next()
  const header = ctx.res.header
  if ([4006, 4407].includes(header.code)) {
    console.log('%c%s', 'color: #20bd08;font-size:15px', '===TQY===: checkResultCode -> header.msg', header.msg)
    return Promise.reject(header.msg)
  }
}

let isTokenOverdue = false
let doingGetToken = false
let requestQueue: any[] = []
// 检查token
export const checkToken = async (ctx: Context, next: any) => {
  // token过期,拦截后面全部请求,返回promise
  if (isTokenOverdue) {
    return saveRequestPromise(ctx.req, requestQueue)
  }

  await next()

  const header = ctx.res.header
  if ([4001, 50005].includes(header.code)) {
    isTokenOverdue = true

    if (!doingGetToken) {
      doingGetToken = true
      // 获取token,不要等待
      getTokenByCodeToLogin()
        .then(data => {
          // resolve所有的promise
          doingGetToken = isTokenOverdue = false
          requestQueue.forEach(item => item.resolve())
          requestQueue = []
          return data
        })
        .catch(error => {
          doingGetToken = isTokenOverdue = false
          requestQueue.forEach(item => item.reject())
          requestQueue = []
          // delayToast('token获取失败')
          // router.navigateTo('login')
          return error
        })
    }

    // 把自己存起来,返回promise
    return saveRequestPromise(ctx.req, requestQueue)
  }
}

/**
 * 保存拦截的请求
 */
// tslint:disable-next-line: no-shadowed-variable
function saveRequestPromise(option: Taro.request.Param<IQurey<any>>, requestQueue: any[]) {
  return new Promise((resolve, reject) => requestQueue.push({ resolve, reject })).then(async () => (await fetchData(option)).data)
}

/**
 * 专门直接拿code去登录的特殊方法
 */
export async function getTokenByCodeToLogin() {
  const { code } = await Taro.login()

  const data = ((await fetchData(getTokenOption(code) as any)) as unknown) as IResult<any>

  // 除了2000其他都reject
  if (!(data.header && data.header.code && [2000].includes(data.header.code))) {
    return Promise.reject(data.header.msg)
  }
  return data.data
}

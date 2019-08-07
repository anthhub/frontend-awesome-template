import { getTokenOption } from '@config/config'
import Taro from '@tarojs/taro'
import { fetchData } from '../fetch'

let isTokenOverdue = false
let doingGetToken = false
let requestQueue: any[] = []
// 检查token
export const checkTokenOverdue = async (ctx: Context, next: any) => {
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

import { composeMiddleware } from './compose'
import { fetchData } from './fetch'
import * as interceptors from './interceptors'

class Exchange {
  private readonly fetchData: (...argas: any[]) => Promise<any>

  private readonly middleware: Middleware[] = []

  constructor(_fetchData: (...argas: any[]) => Promise<any>) {
    this.fetchData = _fetchData
  }

  async fetch(option: Param<IQurey<any>>) {
    const req = option
    const res = {}
    return this.callback({ req, res: res as any }).catch((err: any) => console.warn('顶部捕获异常!', err))
  }

  use(fn: Middleware) {
    this.middleware.push(fn)
    return this
  }

  private async toRequest(ctx: Context, next: any) {
    await next()
    ctx.res = await this.fetchData(ctx.req)
  }

  private callback(ctx: Context) {
    const toRequest = this.toRequest.bind(this)
    const fn = composeMiddleware([...this.middleware, toRequest])
    return fn(ctx, null as any)
  }
}

const exchange = new Exchange(fetchData)

Object.values(interceptors).map(interceptor => exchange.use(interceptor))

export default exchange

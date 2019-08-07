import { composeMiddleware } from './compose'
import { fetchData } from './fetch'
import { interceptors } from './interceptors'

class Exchange {
  private readonly fetchData: (...argas: any[]) => Promise<any>

  private middleware: Middleware[] = []

  constructor(_fetchData: (...argas: any[]) => Promise<any>) {
    this.fetchData = _fetchData
  }

  async fetch(option: Param<IQurey<any>>): Promise<IResult<any>> {
    const ctx = { req: option, res: {} as any }
    let rs = null
    try {
      rs = await this.callback(ctx)
    } catch (error) {
      console.warn('%c%s', 'color: #20bd08;font-size:15px', '===TQY===: Exchange -> error', error)
      throw error
    }
    return rs
  }

  use(fn: Middleware | Middleware[]) {
    if (typeof fn === 'function') {
      this.middleware.push(fn)
    }
    if (Array.isArray(fn)) {
      this.middleware = this.middleware.concat(fn)
    }
    return this
  }

  private async getResult(ctx: Context, next: any) {
    await next()
    return ctx.res.data && ctx.res.data.data
  }

  private async toRequest(ctx: Context, next: any) {
    await next()
    ctx.res = await this.fetchData(ctx.req)
  }

  private callback(ctx: Context) {
    const fn = composeMiddleware([this.getResult.bind(this), ...this.middleware, this.toRequest.bind(this)])
    return fn(ctx, null as any)
  }
}

const exchange = new Exchange(fetchData)

exchange.use(interceptors)

export default exchange

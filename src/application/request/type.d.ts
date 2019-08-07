type Param<T> = Taro.request.Param<T> & { data: T }

type Middleware = (ctx: Context, next: any) => Promise<any>
type Context = { req: Param<IQurey<any>>; res: IResult<any> }

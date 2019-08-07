// 登录判断
export const checkLogin = async (ctx: Context, next: any) => {
  await next()
  const header = ctx.res.data.header
  if ([70000].includes(header.code)) {
    throw Error(header.msg)
  }
}

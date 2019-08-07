// 通用错误码判断
export const checkResultCode = async (ctx: Context, next: any) => {
  await next()
  const header = ctx.res.data.header
  if (!(header && header.code && [2000, 4001, 4006, 70000, 50005, 4407, 40002].includes(header.code))) {
    throw Error(header.msg)
  }
}

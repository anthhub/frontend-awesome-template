// 手机号判断
export const checkBindPhone = async (ctx: Context, next: any) => {
  await next()
  const header = ctx.res.data.header

  if ([4006, 4407].includes(header.code)) {
    throw Error(header.msg)
  }
}

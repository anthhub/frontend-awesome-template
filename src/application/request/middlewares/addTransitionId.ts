// 加上transitionId
export const addTransitionId = async (ctx: Context, next: any) => {
  ctx.req.data.header.transactionId = '222222'
  await next()
}

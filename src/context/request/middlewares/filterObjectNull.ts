import { objFilterNull } from '@lib/utils/object'

// 对象去掉null
export const filterObjectNull = async (ctx: Context, next: any) => {
  const data = ctx.req.data.data
  if (!Array.isArray(data)) {
    ctx.req.data.data = objFilterNull(data)
  }
  await next()
}

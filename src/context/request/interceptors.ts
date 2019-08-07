import { addTransitionId } from './middlewares/addTransitionId'
import { checkBindPhone } from './middlewares/checkBindPhone'
import { checkLogin } from './middlewares/checkLogin'
import { checkResultCode } from './middlewares/checkResultCode'
import { checkTokenOverdue } from './middlewares/checkTokenOverDue'
import { filterObjectNull } from './middlewares/filterObjectNull'

/**
 * 拦截器
 */

export const interceptors = [filterObjectNull, addTransitionId, checkResultCode, checkLogin, checkBindPhone, checkTokenOverdue]

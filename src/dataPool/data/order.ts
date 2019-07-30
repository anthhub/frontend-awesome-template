export const orderStatusTab = {
  0: '全部',
  1: '待支付',
  3: '待发货',
  4: '待收货',
  7: '已完成',
}

// 订单状态 1-待支付 2-支付中 3-待发货 4-待收货 5-已取消 6-已关闭 7-已完成
export const statusCode2Text = {
  0: '全部',
  1: '待支付',
  // 2: '支付中',
  2: '待支付',

  3: '待发货',
  4: '待收货',
  5: '已取消',
  6: '已关闭',
  7: '已完成',
}

// 逆向状态 1-待处理 2-完成
export const reverseStatus2Text = {
  1: '售后申请中',
  2: '售后已完成',
}

// 交易从属 1-B2C 2-C2C 3-C2C商家
export const subordinateCode2Text = {
  1: 'B2C',
  2: 'C2C',
  3: 'C2C商家',
}

// 支付渠道 aliPay-支付宝 wechatPay-微信
export const paymentTypeCode2Text = {
  aliPay: '支付宝',
  wechatPay: '微信',
}

export const orderOperationType = {
  del: '确认删除订单?',
  comfirmShip: '确认收货?',
  cancel: '确认取消订单?',
}

export type OrderOperationType = keyof typeof orderOperationType

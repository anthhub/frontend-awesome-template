import icon from './icon'

// 订单状态 0-全部 1-待支付 2-支付中 3-待发货 4-待收货 5-已取消 6-已关闭 7-已完成
export const orderIcon = [
  {
    icon: icon.icon_unpaid,
    key: 1,
    name: '待支付',
    url: 'orderList',
    urlParam: '1',
  },
  {
    icon: icon.icon_shipments,
    name: '待发货',
    key: 3,
    url: 'orderList',
    urlParam: '3',
  },
  {
    icon: icon.icon_wait_receive,
    name: '待收货',
    key: 4,
    url: 'orderList',
    urlParam: '4',
  },
  {
    icon: icon.icon_after_sales,
    name: '售后',
    key: 0,
    url: 'afterSaleOrderList',
    urlParam: '',
  },
]

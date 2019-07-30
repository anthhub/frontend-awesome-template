// import { h5BaseUrl } from '@http/urls'

export const pagesMap = {
  // index
  index: 'pages/index/index',

  home: 'pages/home/index',
  maintenance: 'pages/maintenance/index',

  goods: 'pages/goods/index',
  // 登录注册
  login: 'pages/login/index',
  fillVerificationCode: 'pages/fillVerificationCode/index',
  fillPhoneNumber: 'pages/fillPhoneNumber/index',

  // 订单
  orderList: 'pages/orderList/index',
  order: 'pages/order/index',
  addressList: 'pages/addressList/index',
  address: 'pages/address/index',
  payResult: 'pages/payResult/index',
  shipping: 'pages/shipping/index',
  confirmOrder: 'pages/confirmOrder/index',
  // 个人中心
  user: 'pages/user/index',
  userSetting: 'pages/userSetting/index',
  userEdit: 'pages/userEdit/index',
  userEditHead: 'pages/userEditHead/index',
  // 活动
  task: 'pages/task/index',
  inviteList: 'pages/inviteList/index',
  // 发售
  moreSale: 'pages/moreSale/index',
  scene: 'pages/scene/index',
  afterSaleOrderList: 'pages/afterSaleOrderList/index',

  // h5
  h5: 'pages/h5/index',

  // 受邀用户承接页
  activity: 'pages/activity/index',
}

export type Pages = keyof typeof pagesMap

// 登录功能页面
export const loginPages: Pages[] = ['login', 'fillPhoneNumber', 'fillVerificationCode']

// 不需要登录就可以去的页面
export const withoutLoginPages: Pages[] = [...loginPages, 'home', 'moreSale', 'scene', 'task', 'activity']

// const h5Version = 'v1'

// const h5Prefix = `${h5BaseUrl}/${h5Version}`

export const h5PagesMap = {
  // index: `${h5Prefix}/index.html`,
  // logistics: `${h5Prefix}/logistics.html`,
  // privacy: `${h5Prefix}/privacy.html`,
  // about: `${h5Prefix}/about.html`,
  // help: `${h5Prefix}/help.html`,
}

export type H5Pages = keyof typeof h5PagesMap

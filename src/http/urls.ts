// const baseUrl = {
//   dev: 'https://api-alpha.heywoof.com',
//   test: 'https://api-beta.heywoof.com',
//   prod: 'https://api-new.heywoof.com',
// }

// const h5BaseUrlMap = {
//   dev: 'https://woof-app-h5.heywoof.com/alpha',
//   test: 'https://woof-app-h5.heywoof.com/test',
//   prod: 'https://woof-app-h5.heywoof.com/prod',
// }

// export const h5BaseUrl = h5BaseUrlMap[process.env.API_ENV || 'dev']

// const rootPath = baseUrl[process.env.API_ENV || 'dev']
// console.log('%c%s', 'color: #20bd08;font-size:15px', '===TQY===: process.env.API_ENV', process.env.API_ENV, rootPath)

// export const order = {
//   afterSaleOrderList: `${rootPath}/order/reverseSingle/2cPage`,
//   list: `${rootPath}/order/order/page`,
//   tick: `${rootPath}/order/clock/currentTime`,
//   detail: `${rootPath}/order/order/detail`,
//   create: `${rootPath}/order/order/createOrder`,
//   del: `${rootPath}/order/order/delOrder`,
//   cancel: `${rootPath}/order/order/cancelOrder`,
//   confirmShip: `${rootPath}/order/order/confirmReceipt`,
//   check: `${rootPath}/order/order/check`,
// }

// export const shipping = {
//   detail: `${rootPath}/order/kuaidi100/query`,
// }

// export const address = {
//   list: `${rootPath}/user/address/list`,
//   changeDefault: `${rootPath}/user/address/setDefault`,
//   add: `${rootPath}/user/address/create`,
//   update: `${rootPath}/user/address/update`,
//   delete: `${rootPath}/user/address/remove`,
//   detail: `${rootPath}/user/address/detail`,
// }

// export const pay = {
//   pay: `${rootPath}/order/order/pay`,
//   payResult: `${rootPath}/order/pay/queryStatus`,
// }

// export const user = {
//   bindPhone: rootPath + '/user/wfUser/bindPhone',
//   wxLogin: rootPath + '/user/wfUser/loginByWechat',
//   getTokenByCode: rootPath + '/user/wfUser/loginByWechat',
//   getVerificationCode: rootPath + '/user/wfSms/sendMsg',
//   verificationCodeLogin: rootPath + '/user/wfUser/login',
//   clientStatus: rootPath + '/user/client/status',
// }

// export const userCenter = {
//   setName: rootPath + '/user/wfUser/updateNickName',
//   setHead: rootPath + '/user/wfUser/updateAvatar',
//   userInfo: rootPath + '/user/wfUser/userInfo',
//   upload: rootPath + '/user/file/upload',
//   orderInfo: rootPath + '/order/order/orderStatistics',
//   latelyActivity: `${rootPath}/activity/activity/mobile/userActivity`,
// }
// export const goods = {
//   detail: `${rootPath}/search/product/findspubyid`,
//   spec: `${rootPath}/search/product/findtasksku`,
//   check: `${rootPath}/order/order/check`,
//   checkOrder: `${rootPath}/order/order/orderActivityCheck`,
//   share: `${rootPath}/activity/activity/mobile/shareModel`,
// }

// export const home = {
//   home: `${rootPath}/activity/activity/mobile/highestPriority`,
//   list: `${rootPath}/activity/activity/mobile/page`,
// }

// export const activity = {
//   answer: `${rootPath}/activity/scene/answer`,
//   happened: `${rootPath}/activity/scene/happened`,
//   detail: `${rootPath}/activity/activity/mobile/detail`,
//   allProduct: `${rootPath}/activity/activity/mobile/allProduct`,
// }

// export const task = {
//   list: `${rootPath}/activity/task/task/list`,
//   submitAnswer: `${rootPath}/activity/participant/answer`,
//   checkUserTask: `${rootPath}/user/theaterUser/checkUser`,
// }

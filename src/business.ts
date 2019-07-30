declare interface IResult<T> {
  header: {
    code: number;
    msg: string;
    transactionId: string;
  }
  data: T
}

// 请求后台类型
declare interface IQurey<T> {
  data: T
  header: {
    authToken: string;
    channel: string;
    client: string;
    deviceType: string;
    transactionId: string;
  }
}

declare interface IWxUserInfo {
  userId: string
  nickName: string
  unionId: string
  openId: string
  avatar: string
  identity: any
  orinChannel: number
  updateAt: string
  createBy: any
  updateBy: any
  createAt: string
  locked: number
  wechatId: any
  address: any
  sex: number
  token: string
  phone: string
  realName: any
  userIds: any
  mainUnionId: string
  mainWechatId: any
  mainUserId: string
}

import Taro from '@tarojs/taro'

/**
 * 请求实体
 */
export async function fetchData(option: Taro.request.Param<IQurey<any>>) {
  const { data } = await Taro.request(option)
  return data as Promise<IResult<any>>
}

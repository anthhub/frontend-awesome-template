import { default as Taro } from '@tarojs/taro'

/**
 * 请求实体
 */
export async function fetchData(option: Taro.request.Param<IQurey<any>>) {
  const data = await Taro.request(option)
  return data as Taro.request.Promised<IResult<any>>
}

export function myTimeToLocal(inputTime: number): string {
  if (!inputTime) {
    return ''
  }
  let localTime = ''
  const inputTimeNew = new Date(inputTime).getTime()
  const offset = new Date().getTimezoneOffset()
  localTime = new Date(inputTimeNew - offset * 60000).toISOString()
  localTime = localTime.substr(0, localTime.lastIndexOf('.'))
  localTime = localTime.replace('T', ' ')
  return localTime
}

export function formatDuring(mss: number) {
  const minutes = Math.floor((mss % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((mss % (1000 * 60)) / 1000)
  let secondStr = `${seconds}`
  let minutesStr = `${minutes}`
  if (seconds <= 0 && minutes <= 0) {
    return ''
  }
  if (seconds < 10) {
    secondStr = `0${seconds}`
  }
  if (minutes < 10) {
    minutesStr = `0${minutes}`
  }
  return minutesStr + ' : ' + secondStr
}

export function getNowMinSecond() {
  const date = new Date()

  const seperator2 = ':'

  const currentdate = date.getHours() + seperator2 + date.getMinutes()
  return currentdate
}

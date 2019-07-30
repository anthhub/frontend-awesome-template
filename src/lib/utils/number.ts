export function randomRange(minNum: number, maxNum: number) {
  return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum)
}

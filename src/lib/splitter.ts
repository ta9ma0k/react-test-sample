const SPLIT_SIZE = {
  LARGE: 4,
  MEDIUM: 2,
  SMALL: 1,
}
type WalletSize = 'lg' | 'md' | 'sm'
export type WalletSizeList = WalletSize[]

export function splitSm(
  bill: number,
  sizeList: WalletSizeList
): number {
  return calculate(bill, sizeList, SPLIT_SIZE.SMALL)
}

export function splitMd(
  bill: number,
  sizeList: WalletSizeList
): number {
  return calculate(bill, sizeList, SPLIT_SIZE.MEDIUM)
}

export function splitLg(
  bill: number,
  sizeList: WalletSizeList
): number {
  return calculate(bill, sizeList, SPLIT_SIZE.LARGE)
}

function calculate(
  bill: number,
  sizeList: WalletSizeList,
  size: number
): number {
  const divider =
    SPLIT_SIZE.LARGE * sizeList.filter(v => v === 'lg').length 
      + SPLIT_SIZE.MEDIUM * sizeList.filter(v => v === 'md').length
      + SPLIT_SIZE.SMALL * sizeList.filter(v => v === 'sm').length
  if (divider === 0) {
    return 0
  }
  return Math.floor(bill / divider) * size
}

export function getSurplus(
  bill: number,
  sizeList: WalletSizeList
): number {
  const divider =
    SPLIT_SIZE.LARGE * sizeList.filter(v => v === 'lg').length 
      + SPLIT_SIZE.MEDIUM * sizeList.filter(v => v === 'md').length
      + SPLIT_SIZE.SMALL * sizeList.filter(v => v === 'sm').length
  if (divider === 0) {
    return 0
  }
  return Math.floor(bill % divider)
}

import { WalletSize } from '../types/walletSize'
const SPLIT_SIZE = {
  LARGE: 4,
  MEDIUM: 2,
  SMALL: 1,
}
export function splitSm(bill: number, sizeList: WalletSize[]): number {
  return calculate(bill, sizeList, SPLIT_SIZE.SMALL)
}

export function splitMd(bill: number, sizeList: WalletSize[]): number {
  return calculate(bill, sizeList, SPLIT_SIZE.MEDIUM)
}

export function splitLg(bill: number, sizeList: WalletSize[]): number {
  return calculate(bill, sizeList, SPLIT_SIZE.LARGE)
}

function calculate(bill: number, sizeList: WalletSize[], size: number): number {
  const divider =
    SPLIT_SIZE.LARGE * sizeList.filter((v) => v === 'lg').length +
    SPLIT_SIZE.MEDIUM * sizeList.filter((v) => v === 'md').length +
    SPLIT_SIZE.SMALL * sizeList.filter((v) => v === 'sm').length
  if (divider === 0) {
    return 0
  }
  return Math.floor(bill / divider) * size
}

export function getSurplus(bill: number, sizeList: WalletSize[]): number {
  const divider =
    SPLIT_SIZE.LARGE * sizeList.filter((v) => v === 'lg').length +
    SPLIT_SIZE.MEDIUM * sizeList.filter((v) => v === 'md').length +
    SPLIT_SIZE.SMALL * sizeList.filter((v) => v === 'sm').length
  if (divider === 0) {
    return 0
  }
  return Math.floor(bill % divider)
}

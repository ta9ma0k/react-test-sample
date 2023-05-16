import { WalletSizeList, splitLg, splitMd, splitSm, getSurplus } from './splitter'

const args: WalletSizeList = ['lg', 'md', 'sm']
describe('lg:md:sm=4:2:1で割り勘すること', () => {
  test('splitSm,smの値を返すこと', () => {
    expect(splitSm(7000, args)).toBe(1000)
  })
  test('splitMd,mdの値を返すこと', () => {
    expect(splitMd(7000, args)).toBe(2000)
  })
  test('splitLg,lgの値を返すこと', () => {
    expect(splitLg(7000, args)).toBe(4000)
  })
  test('割り勘する人がいないときは0を返すこと', () => {
    expect(splitSm(1000, [])).toBe(0)
    expect(splitMd(1000, [])).toBe(0)
    expect(splitLg(1000, [])).toBe(0)
  })
})

describe('割り切れない値を余りとして返すこと', () => {
  test('余りを返すこと', () => {
    expect(getSurplus(7001, args)).toBe(1)
  })
  test('割り勘する人がいない時は0を返すこと', () => {
    expect(getSurplus(7001, [])).toBe(0)
  })
})

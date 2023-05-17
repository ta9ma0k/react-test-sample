import { act, renderHook } from '@testing-library/react'
import { useReceipts } from './useReceipts'

describe('useReceipts', () => {
  test('生成時レシートが存在しないこと', () => {
    const { result } = renderHook(() => useReceipts())
    expect(result.current[0].receipts).toHaveLength(0)
  })
  test('addReceipt:レシートを追加できること', () => {
    const { result } = renderHook(() => useReceipts())
    act(() => {
      result.current[1].addReceipt({ title: 'test1', money: 100 })
    })
    expect(result.current[0].receipts).toHaveLength(1)
    const receipt1 = result.current[0].receipts[0]
    expect(receipt1).toEqual({ title: 'test1', money: 100 })
  })
  test('sum:レシートが存在しない時０を返すこと', () => {
    const { result } = renderHook(() => useReceipts())
    expect(result.current[0].sum).toBe(0)
  })
  test('sum:レシートが存在する時金額の合計を返すこと', () => {
    const { result } = renderHook(() => useReceipts())
    act(() => {
      result.current[1].addReceipt({ title: 'test1', money: 100 })
      result.current[1].addReceipt({ title: 'test2', money: 100 })
    })
    expect(result.current[0].sum).toBe(200)
  })
})

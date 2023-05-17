import { act, renderHook } from '@testing-library/react'
import { useMembers } from './useMembers'

describe('useMembers', () => {
  test('生成時メンバーが存在しないこと', () => {
    const { result } = renderHook(() => useMembers())

    expect(result.current[0].members).toHaveLength(0)
  })
  test('addMember:メンバーを追加できること', () => {
    const { result } = renderHook(() => useMembers())
    act(() => {
      result.current[1].addMember({ name: 'user1', size: 'lg' })
    })

    expect(result.current[0].members).toHaveLength(1)
    const member1 = result.current[0].members[0]
    expect(member1).toEqual({ name: 'user1', size: 'lg' })
  })
  test('sizeList:メンバーの財布サイズのリスト', () => {
    const { result } = renderHook(() => useMembers())
    act(() => {
      result.current[1].addMember({ name: 'user1', size: 'lg' })
      result.current[1].addMember({ name: 'user2', size: 'md' })
    })
    expect(result.current[0].sizeList).toEqual(['lg', 'md'])
  })
})

import { render, screen } from '@testing-library/react'
import { MemberCard } from './MemberCard'

describe('メンバー情報を表示する', () => {
  test('名前が表示されること', () => {
    render(<MemberCard name='hoge' size='lg' payment={100} />)
    expect(screen.getByText('hoge')).toBeInTheDocument()
  })
  test('sizeがlgの時財布のサイズがtext-4xl表示されること', () => {
    render(<MemberCard name='hoge' size='lg' payment={100} />)
    expect(screen.queryByTestId('wallet-icon')).toHaveClass('text-4xl')
  })
  test('sizeがmdの時財布のサイズがtext-2xl表示されること', () => {
    render(<MemberCard name='hoge' size='md' payment={100} />)
    expect(screen.queryByTestId('wallet-icon')).toHaveClass('text-2xl')
  })
  test('sizeがsmの時財布のサイズがtext-sm表示されること', () => {
    render(<MemberCard name='hoge' size='sm' payment={100} />)
    expect(screen.queryByTestId('wallet-icon')).toHaveClass('text-sm')
  })
  test('金額が表示されること', () => {
    render(<MemberCard name='hoge' size='lg' payment={1000} />)
    expect(screen.getByText('¥1,000')).toBeInTheDocument()
  })
})

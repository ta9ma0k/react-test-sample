import { render, screen } from '@testing-library/react'
import { ReceiptCard } from './ReceiptCard'

describe('領収書情報を表示する', () => {
  test('件名が表示されること', () => {
    render(<ReceiptCard title='test' amount={1000} />)
    expect(screen.getByText('test')).toBeInTheDocument()
  })
  test('金額が表示されること', () => {
    render(<ReceiptCard title='test' amount={1000} />)
    expect(screen.getByText('¥1,000')).toBeInTheDocument()
  })
})

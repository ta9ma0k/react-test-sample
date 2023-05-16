import { render, screen, within } from '@testing-library/react'
import { TwoContentsLayout } from './TwoContents'

describe('２つのコンテンツレイアウトを表示する', () => {
  const Sut = () => (
    <TwoContentsLayout>
      <h5>left</h5>
      <h5>right</h5>
      <h5>bottom</h5>
    </TwoContentsLayout>
  )
  test('1つ目のchidren nodeを左に表示する', () => {
    render(<Sut />)
    expect(
      within(screen.getByTestId('left-content')).getByText('left')
    ).toBeInTheDocument()
  })
  test('2つ目のchidren nodeを右に表示する', () => {
    render(<Sut />)
    expect(
      within(screen.getByTestId('right-content')).getByText('right')
    ).toBeInTheDocument()
  })
  test('3つ目のchidren nodeを下に表示する', () => {
    render(<Sut />)
    expect(
      within(screen.getByTestId('bottom-content')).getByText('bottom')
    ).toBeInTheDocument()
  })
})

import { render, screen } from '@testing-library/react'
import { Input } from './Input'

describe('Inputエリアを表示する', () => {
  test('nameを指定する', () => {
    render(<Input name='test' />)
    expect(screen.getByRole('textbox')).toHaveAttribute('name', 'test')
  })
  test('labelを指定する', () => {
    render(<Input name='test' label='label' />)
    expect(screen.getByText('label')).toBeInTheDocument()
  })
  test('labelを指定しない時nameの値を表示する', () => {
    render(<Input name='test' />)
    expect(screen.getByText('test')).toBeInTheDocument()
  })
  test('typeにnumberを指定する', () => {
    render(<Input name='test' type='number' />)
    expect(screen.getByRole('spinbutton')).toBeInTheDocument()
  })
  test('typeを指定しない時typeにtextが設定される', () => {
    render(<Input name='test' />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })
})

import { render, screen, within } from '@testing-library/react'
import { Select } from './Select'

const options = [
  { value: 'v1', label: 'label1' },
  { value: 'v2', label: 'label2' },
]
describe('Selectエリアを表示する', () => {
  test('nameを指定する', () => {
    render(<Select name='test' options={options} />)
    expect(screen.getByRole('combobox')).toHaveAttribute('name', 'test')
  })
  test('labelを指定する', () => {
    render(<Select name='test' label='label' options={options} />)
    expect(screen.getByText('label')).toBeInTheDocument()
  })
  test('labelを指定しない時nameの値がlabelを表示する', () => {
    render(<Select name='test' options={options} />)
    expect(screen.getByText('test')).toBeInTheDocument()
  })
  test('指定したoptionsを表示する', () => {
    render(<Select name='test' options={options} />)
    const combobox = screen.getByRole('combobox')
    const optionList = within(combobox).getAllByRole('option')
    expect(optionList).toHaveLength(2)
    expect(optionList[0]).toHaveAttribute('value', 'v1')
    expect(within(optionList[0]).getByText('label1')).toBeInTheDocument()
    expect(optionList[1]).toHaveAttribute('value', 'v2')
    expect(within(optionList[1]).getByText('label2')).toBeInTheDocument()
  })
})

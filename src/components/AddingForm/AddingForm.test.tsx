import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AddingForm } from './AddingForm'
import { FormEvent } from 'react'

const user = userEvent.setup()

describe('formを表示する', () => {
  test('追加ボタンが表示されること', () => {
    const handleOnAddMock = jest.fn()
    render(<AddingForm onAdd={handleOnAddMock} />)

    const addButton = screen.getByRole('button')
    expect(addButton).toBeInTheDocument()
    expect(within(addButton).getByText('追加')).toBeInTheDocument()
  })
  test('追加ボタンをクリックするとonAddが呼び出されること', async () => {
    const mockFn = jest.fn()
    const handleOnAddMock = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      mockFn()
    }

    render(<AddingForm onAdd={handleOnAddMock} />)

    const addButton = screen.getByRole('button')
    await user.click(addButton)
    expect(mockFn).toHaveBeenCalledTimes(1)
  })
  test('子要素が表示されること', () => {
    const handleOnAddMock = jest.fn()
    const Component = () => (
      <AddingForm onAdd={handleOnAddMock}>
        <div>hoge</div>
      </AddingForm>
    )
    render(<Component />)
    expect(screen.getByText('hoge')).toBeInTheDocument()
  })
})

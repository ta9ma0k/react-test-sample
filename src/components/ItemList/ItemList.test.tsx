import { render, screen, within } from '@testing-library/react'
import { ItemList } from './ItemList'

type TestItem = {
  v1: string
  v2: number
}
function TestItem(props: TestItem): JSX.Element {
  return (
    <div>
      {props.v1}-{props.v2}
    </div>
  )
}
const items: TestItem[] = [
  { v1: 'hoge', v2: 0 },
  { v1: 'fuga', v2: 1 },
]
describe('リストを表示する', () => {
  test('リストアイテムをアイテムのレイアウトで表示する', () => {
    const Component = () => (
      <ItemList<TestItem> items={items}>
        {(item) => <TestItem v1={item.v1} v2={item.v2} />}
      </ItemList>
    )
    render(<Component />)

    const listitem = screen.getAllByRole('listitem')
    expect(listitem).toHaveLength(2)
    expect(within(listitem[0]).getByText('hoge-0')).toBeInTheDocument()
    expect(within(listitem[1]).getByText('fuga-1')).toBeInTheDocument()
  })
})

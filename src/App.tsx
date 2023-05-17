import { FormEventHandler, useCallback } from 'react'
import { getSurplus, split } from './lib/splitter'
import { WalletSize } from './types/walletSize'
import { AddingForm, Input, Select } from './components/AddingForm'
import { ItemList } from './components/ItemList'
import { MemberCard, MemberCardProps } from './components/Member/MemberCard'
import { ReceiptCard } from './components/Receipt/ReceiptCard'
import { TwoContentsLayout } from './components/Layout/TwoContents'
import { useMembers } from './hooks/useMembers'
import { useReceipts } from './hooks/useReceipts'
import { Receipt } from './types/receipt'

const sizeOptions: { value: string; label: string }[] = [
  { value: 'md', label: '普通' },
  { value: 'lg', label: '多め' },
  { value: 'sm', label: '少なめ' },
]
function App(): JSX.Element {
  const [{ receipts, sum }, { addReceipt }] = useReceipts()
  const [{ members, sizeList }, { addMember }] = useMembers()

  const handleOnAddMember: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault()
      const { value: name } = (e.target as any).name as { value: string }
      const { value: size } = (e.target as any).size as {
        value: WalletSize
      }
      addMember({ name, size })
    },
    [addMember]
  )

  const handleOnAddRecipt: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault()
      const { value: title } = (e.target as any).title as { value: string }
      const { value: money } = (e.target as any).money as { value: string }

      addReceipt({ title, money: Number(money) })
    },
    [addReceipt]
  )

  const results = members.map(
    (v) =>
      ({
        ...v,
        payment: split(v.size, sum, sizeList),
      } as MemberCardProps)
  )
  const surplus = getSurplus(sum, sizeList)

  return (
    <TwoContentsLayout>
      <>
        <AddingForm onAdd={handleOnAddMember}>
          <Input name='name' label='名前' />
          <Select name='size' label='どれくらい払う？' options={sizeOptions} />
        </AddingForm>
        <ItemList<MemberCardProps> items={results}>
          {({ name, size, payment }) => (
            <MemberCard name={name} size={size} payment={payment} />
          )}
        </ItemList>
      </>
      <>
        <AddingForm onAdd={handleOnAddRecipt}>
          <Input name='title' label='件名' />
          <Input name='money' label='金額' />
        </AddingForm>
        <ItemList<Receipt> items={receipts}>
          {(item) => <ReceiptCard title={item.title} amount={item.money} />}
        </ItemList>
      </>
      <ReceiptCard title='余り' amount={surplus} />
    </TwoContentsLayout>
  )
}

export default App

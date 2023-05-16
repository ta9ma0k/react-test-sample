import { FormEventHandler, useCallback } from 'react'
import { useState } from 'react'
import { getSurplus, splitLg, splitMd, splitSm } from './lib/splitter'
import { WalletSize } from './types/walletSize'
import { AddingForm, Input, Select } from './components/AddingForm'
import { ItemList } from './components/ItemList'
import { MemberCard, MemberCardProps } from './components/Member/MemberCard'
import { ReceiptCard } from './components/Receipt/ReceiptCard'
import { TwoContentsLayout } from './components/Layout/TwoContents'

type Member = {
  name: string
  size: WalletSize
}
type Receipt = {
  title: string
  money: number
}
const sizeOptions: { value: string; label: string }[] = [
  { value: 'md', label: '普通' },
  { value: 'lg', label: '多め' },
  { value: 'sm', label: '少なめ' },
]
function App(): JSX.Element {
  const [receipts, setReceipts] = useState<Receipt[]>([])
  const [members, setMembers] = useState<Member[]>([])

  const handleOnAddMember: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault()
      const { value: name } = (e.target as any).name as { value: string }
      const { value: size } = (e.target as any).size as {
        value: WalletSize
      }
      setMembers((s) => [...s, { name, size }])
    },
    []
  )

  const handleOnAddRecipt: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault()
      const { value: title } = (e.target as any).title as { value: string }
      const { value: money } = (e.target as any).money as { value: string }

      setReceipts((s) => [...s, { title, money: Number(money) }])
    },
    []
  )

  const sum = receipts.map((v) => v.money).reduce((a, b) => a + b, 0)
  const sizeList = members.map((v) => v.size)
  const results = members.map(
    (v) =>
      ({
        ...v,
        payment:
          v.size === 'lg'
            ? splitLg(sum, sizeList)
            : v.size === 'md'
            ? splitMd(sum, sizeList)
            : splitSm(sum, sizeList),
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

import React, { FormEventHandler, useCallback } from 'react'
import { useState } from 'react'
import { getSurplus, splitLg, splitMd, splitSm } from './lib/splitter'
import { WalletSize } from './types/walletSize'
import { AddingForm, Input, Select } from './components/AddingForm'

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
  const sm = splitSm(sum, sizeList)
  const md = splitMd(sum, sizeList)
  const lg = splitLg(sum, sizeList)
  const surplus = getSurplus(sum, sizeList)

  return (
    <div className='space-y-3 py-2'>
      <div className='flex flex-row justify-center space-x-4'>
        <div className='w-1/3 space-y-2'>
          <AddingForm onAdd={handleOnAddMember}>
            <Input name='name' label='名前' />
            <Select
              name='size'
              label='どれくらい払う？'
              options={sizeOptions}
            />
          </AddingForm>
          <ul className='space-y-2'>
            {members.map((v, i) => (
              <React.Fragment key={`members-${i}`}>
                <li className='rounded-md border-2 px-4 py-2'>
                  <div className='flex h-12 flex-row items-center justify-between'>
                    <span>{v.name}</span>
                    <span
                      className={
                        v.size === 'lg'
                          ? 'text-4xl'
                          : v.size === 'md'
                          ? 'text-2xl'
                          : 'text-sm'
                      }
                    >
                      👛
                    </span>
                    <span>
                      ¥
                      {(v.size === 'lg'
                        ? lg
                        : v.size === 'md'
                        ? md
                        : sm
                      ).toLocaleString()}
                    </span>
                  </div>
                </li>
              </React.Fragment>
            ))}
          </ul>
        </div>
        <div className='w-1/3 space-y-2'>
          <AddingForm onAdd={handleOnAddRecipt}>
            <Input name='title' label='件名' />
            <Input name='money' label='金額' />
          </AddingForm>
          <ul className='space-y-2'>
            {receipts.map((v, i) => (
              <React.Fragment key={`receipt-${i}`}>
                <li className='rounded-md border-2 px-4 py-2'>
                  {v.title} : ¥{v.money.toLocaleString()}
                </li>
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
      <div className='text-center'>余り : ¥{surplus.toLocaleString()}</div>
    </div>
  )
}

export default App

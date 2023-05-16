import React, { FormEventHandler, useCallback } from 'react'
import { useState } from 'react'
import { getSurplus, splitLg, splitMd, splitSm } from './lib/splitter'
import { WalletSize } from './types/walletSize'

type Member = {
  name: string
  size: WalletSize
}
type Receipt = {
  title: string
  money: number
}
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
          <form onSubmit={handleOnAddMember} className='space-y-1'>
            <fieldset className='flex flex-col'>
              <label className='text-sm'>名前</label>
              <input
                type='text'
                name='name'
                className='rounded-md border-2 px-2'
              />
            </fieldset>
            <fieldset className='flex flex-col'>
              <label className='text-sm'>どれくらい払う？</label>
              <select className='rounded-md border-2' name='size'>
                <option value='md'>普通</option>
                <option value='lg'>多め</option>
                <option value='sm'>少なめ</option>
              </select>
            </fieldset>
            <button
              type='submit'
              className='rounded-md border-2 px-2 hover:cursor-pointer'
            >
              追加
            </button>
          </form>
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
          <form onSubmit={handleOnAddRecipt} className='space-y-1'>
            <fieldset className='flex flex-col'>
              <label className='text-sm'>件名</label>
              <input
                type='text'
                name='title'
                className='rounded-md border-2 px-2'
              />
            </fieldset>
            <fieldset className='flex flex-col'>
              <label className='text-sm'>金額</label>
              <input
                type='number'
                name='money'
                className='rounded-md border-2 px-2'
              />
            </fieldset>
            <button
              type='submit'
              className='rounded-md border-2 px-2 hover:cursor-pointer'
            >
              追加
            </button>
          </form>
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

import { FormEvent, ReactNode } from 'react'

type Props = {
  children?: ReactNode
  onAdd: (e: FormEvent<HTMLFormElement>) => void
}
export function AddingForm({ children, onAdd }: Props): JSX.Element {
  return (
    <form onSubmit={onAdd} className='space-y-1'>
      {children}
      <button
        type='submit'
        className='rounded-md border-2 px-2 hover:cursor-pointer'
      >
        追加
      </button>
    </form>
  )
}

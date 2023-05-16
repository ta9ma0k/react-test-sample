import { ReactNode, useId } from 'react'

type Props<T> = {
  items: T[]
  children: (props: T) => ReactNode
}
export function ItemList<T>({ items, children }: Props<T>): JSX.Element {
  const id = useId()
  return (
    <ul className='space-y-2'>
      {items.map((v, i) => (
        <li key={`${id}-${i}`} className='rounded-md border-2 px-4 py-2'>
          {children(v)}
        </li>
      ))}
    </ul>
  )
}

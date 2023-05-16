import { ReactNode } from 'react'

type Props = {
  children: [ReactNode, ReactNode, ...ReactNode[]]
}
export function TwoContentsLayout({ children }: Props): JSX.Element {
  const [left, right, bottom] = children
  return (
    <div className='flex flex-col justify-center space-y-3 py-2'>
      <div className='flex flex-row justify-center space-x-4'>
        <div data-testid='left-content' className='w-1/3 space-y-2'>
          {left}
        </div>
        <div data-testid='right-content' className='w-1/3 space-y-2'>
          {right}
        </div>
      </div>
      <div
        data-testid='bottom-content'
        className='flex flex-col justify-center text-center'
      >
        {bottom}
      </div>
    </div>
  )
}

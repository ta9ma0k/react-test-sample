import { WalletSize } from '../../types/walletSize'

export type MemberCardProps = {
  name: string
  size: WalletSize
  payment: number
}
export function MemberCard({
  name,
  size,
  payment,
}: MemberCardProps): JSX.Element {
  return (
    <div className='flex h-12 flex-row items-center justify-between'>
      <span>{name}</span>
      <span
        data-testid='wallet-icon'
        className={
          size === 'lg' ? 'text-4xl' : size === 'md' ? 'text-2xl' : 'text-sm'
        }
      >
        👛
      </span>
      <span>¥{payment.toLocaleString()}</span>
    </div>
  )
}

type Props = {
  title: string
  amount: number
}
export function ReceiptCard({ title, amount }: Props): JSX.Element {
  return (
    <div>
      <span>{title}</span>
      <span>:</span>
      <span>¥{amount.toLocaleString()}</span>
    </div>
  )
}

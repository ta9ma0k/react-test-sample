import { useCallback, useMemo, useState } from 'react'
import { Receipt } from '../types/receipt'

type State = Receipt[]
type ReturnType = [
  {
    receipts: Receipt[]
    sum: number
  },
  {
    addReceipt: (receipt: Receipt) => void
  }
]

export function useReceipts(): ReturnType {
  const [state, setState] = useState<State>([])

  const addReceipt = useCallback(
    (receipt: Receipt) => setState((s) => [...s, receipt]),
    []
  )

  const sum = useMemo(
    () => state.map((v) => v.money).reduce((a, b) => a + b, 0),
    [state]
  )

  return [{ receipts: state, sum }, { addReceipt }]
}

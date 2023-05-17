import { useCallback, useMemo, useState } from 'react'
import { Member } from '../types/member'
import { WalletSize } from '../types/walletSize'

type State = Member[]
type ReturnType = [
  {
    members: Member[]
    sizeList: WalletSize[]
  },
  {
    addMember: (member: Member) => void
  }
]

export function useMembers(): ReturnType {
  const [state, setState] = useState<State>([])

  const addMember = useCallback(
    (member: Member) => setState((s) => [...s, member]),
    []
  )
  const sizeList = useMemo(() => state.map((v) => v.size), [state])
  return [{ members: state, sizeList }, { addMember }]
}

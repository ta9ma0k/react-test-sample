type Props = {
  name: string
  label?: string
  type?: 'text' | 'number'
}
export function Input({ name, label, type = 'text' }: Props): JSX.Element {
  return (
    <fieldset className='flex flex-col'>
      <label className='text-sm'>{label ?? name}</label>
      <input type={type} name={name} className='rounded-md border-2 px-2' />
    </fieldset>
  )
}

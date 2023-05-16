type Props = {
  name: string
  label?: string
  options: { value: string; label: string }[]
}
export function Select({ name, label, options }: Props): JSX.Element {
  return (
    <fieldset className='flex flex-col'>
      <label className='text-sm'>{label ?? name}</label>
      <select className='rounded-md border-2' name={name}>
        {options.map((v, i) => (
          <option key={`${name}-${i}`} value={v.value}>
            {v.label}
          </option>
        ))}
      </select>
    </fieldset>
  )
}

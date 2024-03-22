import { ReactNode } from 'react'

interface LabelProps {
  children?: ReactNode
  label: string
  inline?: boolean
  revers?: boolean
}
export const Label = ({ children, label, inline, revers }: LabelProps) => {
  const cssClass = inline
    ? 'form-label items-center inline-flex w-full mb-2 text-gray-700'
    : 'form-label inline-block w-full mb-2 text-gray-700'

  return (
    <label className={cssClass}>
      {revers ? children : label}
      {revers ? label : children}
    </label>
  )
}

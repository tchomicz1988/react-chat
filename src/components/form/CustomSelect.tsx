import { ForwardedRef, forwardRef } from 'react'
import Select from 'react-select'
import { Error } from './Error'

export interface SelectOption {
  value: string
  label: string
}

type CustomSelectProps = {
  isMulti: boolean
  options: SelectOption[]
  error?: string
}

export const CustomSelect = forwardRef(function CustomSelect(
  props: CustomSelectProps,
  ref: ForwardedRef<never>
) {
  const { options, error, ...rest } = props
  return (
    <>
      <Select ref={ref} options={[...options]} {...rest} />
      <Error message={error} />
    </>
  )
})

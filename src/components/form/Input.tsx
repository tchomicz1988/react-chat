import { ForwardedRef, forwardRef, HTMLInputTypeAttribute } from 'react'
import { Error } from './Error'

interface InputProps {
  name: string
  type?: HTMLInputTypeAttribute
  placeholder: string
  error?: string
}

export const Input = forwardRef(function Input(
  props: InputProps,
  ref: ForwardedRef<never>
) {
  const { name, type, placeholder, error, ...rest } = props
  return (
    <>
      <input
        ref={ref}
        type={type || 'text'}
        name={name}
        className="block w-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded"
        placeholder={placeholder}
        {...rest}
      />
      <Error message={error} />
    </>
  )
})

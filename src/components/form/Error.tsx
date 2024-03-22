export const Error = ({ message }: { message?: string }) => {
  return message ? (
    <span className="text-red-500 text-xs italic">{message}</span>
  ) : (
    <></>
  )
}

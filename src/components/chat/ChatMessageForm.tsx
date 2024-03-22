import { ChangeEvent, FormEvent, useState } from 'react'
interface ChatMessageFormProps {
  onSubmit: (_: string) => void
}

export const ChatMessageForm = ({ onSubmit }: ChatMessageFormProps) => {
  const [input, setInput] = useState('')

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

  const onSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!input) {
      return
    }

    onSubmit(input)
    setInput('')
  }

  return (
    <div className="border-t-2 border-gray-200 p-4 mb-2 sm:mb-0">
      <form className="relative flex" onSubmit={onSendMessage}>
        <input
          value={input}
          onChange={onChangeHandler}
          type="text"
          placeholder="Write your message!"
          className="w-full border-0 focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3 mr-1"
        />
        <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
          >
            <span className="font-bold">Send</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-6 w-6 ml-2 transform rotate-90"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  )
}

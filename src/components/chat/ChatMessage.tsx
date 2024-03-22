import { ReactNode, useMemo } from 'react'
import { ChatUser } from '../../lib/client/models/chat.model'
import { stringToColour } from '../../lib/client/utils/utils'

export enum ChatMessageStyle {
  'other',
  'user',
}

export type ChatMessageProps = {
  children: ReactNode
  style: ChatMessageStyle
  user: ChatUser
}

const ChatMessage = ({ children, style, user }: ChatMessageProps) => {
  const color = useMemo(() => stringToColour(user?.email), [user])
  const characters = useMemo(
    () => user?.email?.substring(0, 2).toUpperCase(),
    [user]
  )

  if (style === ChatMessageStyle.other) {
    return (
      <div className="chat-message">
        <div className="flex items-end">
          <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
            <div>
              <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                {children}
              </span>
            </div>
          </div>
          <div
            className="w-8 h-8 rounded-full order-1 text-white text-center leading-8"
            style={{ background: color }}
          >
            {characters}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="chat-message">
      <div className="flex items-end justify-end">
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end ">
          <div>
            <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
              {children}
            </span>
          </div>
        </div>
        <div
          className="w-8 h-8 rounded-full order-2 text-white text-center leading-8"
          style={{ background: color }}
        >
          {characters}
        </div>
      </div>
    </div>
  )
}

export default ChatMessage

import { useEffect, useRef } from 'react'
import { ChatRoomMessage } from '../../lib/client/models/chat.model'
import { scrollToElement } from '../../lib/client/utils/utils'
import ChatMessage, { ChatMessageStyle } from './ChatMessage'

type ChatConversationProps = {
  currentRoomName: string
  chatMessages: ChatRoomMessage[]
  loggedUserEmail?: string
}

export const ChatConversation = ({
  chatMessages,
  currentRoomName,
  loggedUserEmail,
}: ChatConversationProps) => {
  const messagesEnd = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToElement(messagesEnd.current)
  }, [chatMessages?.length])

  return (
    <>
      <div className="bg-blue-400 text-white p-2 font-medium text-lg">
        Active chat: {currentRoomName}
      </div>
      <div
        className="flex flex-col space-y-4 p-3 overflow-y-auto"
        style={{
          height: 'calc(100vh - 220px)',
        }}
      >
        {chatMessages?.map((message: ChatRoomMessage, index: number) => (
          <ChatMessage
            user={message.from}
            key={index}
            style={
              message?.from?.email === loggedUserEmail
                ? ChatMessageStyle.user
                : ChatMessageStyle.other
            }
          >
            {message?.value}
          </ChatMessage>
        ))}
        <div ref={messagesEnd} />
      </div>
    </>
  )
}

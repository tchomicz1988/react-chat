import { useContext } from 'react'
import { useSelector } from 'react-redux'
import ChatConfirmJoin from '../../components/chat/ChatConfirmJoin'
import { ChatMessageForm } from '../../components/chat/ChatMessageForm'
import { ChatConversation } from '../../components/chat/ChatConversation'
import { ChatNewRooms } from '../../components/chat/ChatNewRoom'
import { ChatRooms } from '../../components/chat/ChatRooms'
import { ChatUsers } from '../../components/chat/ChatUsers'
import Layout from '../../components/layout/Layout'
import { SocketContext } from '../../lib/client/context/SocketContext'
import { EventCreateRoom } from '../../lib/shared/shared.model'
import { ChatUser } from '../../lib/client/models/chat.model'
import {
  ChatStoreMessages,
  selectMessages,
} from '../../lib/client/stores/chatMessages'
import { selectRooms } from '../../lib/client/stores/chatRooms'
import { selectUsers } from '../../lib/client/stores/chatUsers'
import { useChat } from '../../lib/client/hooks/useChat'

export default function Chat() {
  const { loggedUser } = useContext(SocketContext)
  const {
    currentChat,
    toRead,
    setActiveRoom,
    invitationRoomName,
    emitNewRoom,
    emitSendMessage,
    emitJoinToRoom,
    setInvitationRoomName,
  } = useChat()

  const users: ChatUser[] = useSelector(selectUsers)
  const rooms: EventCreateRoom[] = useSelector(selectRooms)
  const chatMessages: ChatStoreMessages = useSelector(selectMessages)

  return (
    <Layout>
      <div className="grid grid-rows-2 grid-cols-6 divide-x">
        <div className="col-start-1 col-end-2">
          <ChatNewRooms
            loggedUser={loggedUser}
            users={users}
            onSubmit={(roomParams: EventCreateRoom) => emitNewRoom(roomParams)}
          />
          <ChatUsers
            users={users}
            loggedUser={loggedUser}
            toRead={toRead}
            onClickUser={setActiveRoom}
          />
          <ChatRooms
            roomsList={rooms}
            toRead={toRead}
            onClickRoom={setActiveRoom}
          />
        </div>
        <div className="row-span-2 col-start-2 col-end-7 ">
          <ChatConversation
            currentRoomName={currentChat?.current?.roomName}
            chatMessages={chatMessages[currentChat?.current?.roomName]}
            loggedUserEmail={loggedUser?.email}
          />

          <ChatMessageForm onSubmit={emitSendMessage} />
        </div>
      </div>
      {!!invitationRoomName && (
        <ChatConfirmJoin
          userEmail={loggedUser?.email}
          open={!!invitationRoomName}
          onCancel={() => setInvitationRoomName('')}
          onConfirm={() =>
            emitJoinToRoom({
              roomName: invitationRoomName,
              userEmail: loggedUser?.email || '',
            })
          }
          roomName={invitationRoomName || ''}
        />
      )}
    </Layout>
  )
}

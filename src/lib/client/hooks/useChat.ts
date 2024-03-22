import { User } from '@authorizerdev/authorizer-js'
import { FallbackToUntypedListener } from '@socket.io/component-emitter'
import { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  EventAddMessage,
  EventCreateRoom,
  EventJoinToRoom,
  EventUpdateMessages,
  SocketEvents,
} from '../../shared/shared.model'
import { AppDispatch } from '../stores/store'
import {
  ChatActiveRoom,
  ChatDefaultRooms,
  ChatRoom,
  ChatUser,
} from '../models/chat.model'
import { addMessage, updateMessages } from '../stores/chatMessages'
import { addRoom, updateRooms } from '../stores/chatRooms'
import { selectUsers, updateUsers } from '../stores/chatUsers'
import { SocketContext } from '../context/SocketContext'

export const useChat = () => {
  const { loggedUser, socket, socketId } = useContext(SocketContext)
  const users: ChatUser[] = useSelector(selectUsers)
  const dispatch: AppDispatch = useDispatch()
  const currentChat = useRef<ChatActiveRoom>({
    roomName: ChatDefaultRooms.general,
    to: ChatDefaultRooms.general,
    isPrivate: false,
  })
  const [toRead, setToRead] = useState<string[]>([])
  const [invitationRoomName, setInvitationRoomName] = useState<string>()

  useEffect(() => {
    if (!loggedUser?.socketId) {
      return
    }

    initSession(loggedUser)
    initSocketEvents()
    return () => {
      onLeavePage()
    }
  }, [socketId])

  const appendEvent = (
    eventName: string,
    callback: FallbackToUntypedListener<never>
  ) => {
    !socket?.hasListeners(eventName) && socket?.on(eventName, callback)
  }

  const emitNewRoom = (roomParams: EventCreateRoom) => {
    socket?.emit(SocketEvents.createRoom, roomParams)
  }

  const onLeavePage = () => {
    socket?.removeAllListeners()
    socket?.disconnect()
  }

  const emitSendMessage = (value: string) => {
    if (!value) {
      return
    }

    const hasUser =
      currentChat?.current?.isPrivate &&
      !users.find(
        (user: ChatUser) => user.email === currentChat?.current?.roomName
      )

    if (hasUser) {
      alert('User is offline the message was not sent ')
      return
    }

    socket?.emit(SocketEvents.sendMessage, {
      message: {
        value: value,
        from: loggedUser,
      },
      ...currentChat.current,
    })
  }

  const emitJoinToRoom = ({ roomName, userEmail }: EventJoinToRoom) => {
    if (!roomName || !userEmail) {
      return
    }
    socket?.emit(SocketEvents.joinToRoom, { roomName, userEmail })
  }

  const setActiveRoom = (roomName: string | ChatUser) => {
    const isName = 'string' === typeof roomName

    const activeRoom = isName
      ? {
          isPrivate: false,
          to: roomName,
          roomName: roomName,
        }
      : {
          isPrivate: true,
          to: String(roomName.socketId),
          roomName: roomName.email,
        }

    currentChat.current = activeRoom
    setToRead((state) => state.filter((value) => value !== activeRoom.roomName))
  }

  const initSession = (user: User) => {
    if (!user.email) {
      return
    }

    socket?.emit(SocketEvents.createSession, {
      ...user,
      socketId: socket?.id,
    })
  }

  const onUpdateRoomList = (rooms: ChatRoom[]) => {
    const clientRooms = rooms.map((room: ChatRoom) => {
      const { messages, roomName, ...rest } = room
      dispatch(updateMessages({ messages, roomName }))

      return { roomName, ...rest }
    })

    dispatch(updateRooms(clientRooms))
  }

  const onAddRoom = (room: ChatRoom) => {
    dispatch(addRoom(room))
    dispatch(
      updateMessages({ messages: room.messages, roomName: room.roomName })
    )
  }

  const onUpdateMessages = ({ roomName, messages }: EventUpdateMessages) => {
    dispatch(updateMessages({ messages, roomName }))
    if (currentChat?.current?.roomName !== roomName) {
      setToRead((state) => [...state, roomName])
    }
  }

  const onPrivateMessage = ({ message, roomName }: EventAddMessage) => {
    const userEmail =
      loggedUser?.email === roomName ? message.from.email : roomName
    dispatch(addMessage({ message, roomName: userEmail }))

    if (currentChat?.current?.roomName !== userEmail) {
      setToRead((state) => [...state, userEmail])
    }
  }

  const onUpdateUsers = (users: ChatUser[]) => {
    dispatch(updateUsers(users))
  }

  const initSocketEvents = () => {
    if (socket?.disconnected) {
      socket?.connect()
    }

    socket?.on(SocketEvents.connect_error, (error) => {
      console.log(error, socket?.id)
    })

    appendEvent(SocketEvents.inviteToRoom, (roomName: string) => {
      setInvitationRoomName(roomName)
    })

    appendEvent(SocketEvents.updateRoomsList, (roomsParams: ChatRoom[]) => {
      onUpdateRoomList(roomsParams)
    })

    appendEvent(SocketEvents.addRoomToList, onAddRoom)
    appendEvent(SocketEvents.updateUsers, onUpdateUsers)
    appendEvent(SocketEvents.updateMessages, onUpdateMessages)
    appendEvent(SocketEvents.privateMessage, onPrivateMessage)
  }

  return {
    currentChat,
    emitJoinToRoom,
    emitNewRoom,
    emitSendMessage,
    invitationRoomName,
    setActiveRoom,
    setInvitationRoomName,
    toRead,
  }
}

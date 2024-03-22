import { Socket } from 'socket.io'
import {
  EventAddMessage,
  EventCreateRoom,
  EventJoinToRoom,
  SocketEvents,
} from '../../shared/shared.model'
import { Server as SocketIOServer } from 'socket.io'
import { ServerStore } from '../stores/serverStore'

export const roomsHandler = (io: SocketIOServer, store: ServerStore) => {
  const {
    addUserToRoom,
    getAllUsersEmails,
    getRoom,
    getSession,
    hasRoom,
    addRoom,
  } = store
  const onSendMessage = function (
    this: Socket,
    { message, to, isPrivate, roomName }: EventAddMessage
  ) {
    if (isPrivate) {
      io.to(to).to(this.id).emit(SocketEvents.privateMessage, {
        message,
        roomName,
      })

      return
    }

    const messages = getRoom(to)?.messages || []
    messages.push(message)

    io.to(to).emit(SocketEvents.updateMessages, {
      roomName: to,
      messages,
    })
  }

  const onJoinToRoom = function (
    this: Socket,
    { roomName, userEmail }: EventJoinToRoom
  ) {
    addUserToRoom(roomName, userEmail)
    this.join(roomName)

    this.emit(SocketEvents.addRoomToList, getRoom(roomName))
  }

  const onCreateRoom = function (
    this: Socket,
    { roomName, participants, isPrivate }: EventCreateRoom
  ) {
    if (!roomName || isPrivate === undefined || !participants) {
      return
    }

    if (hasRoom(roomName)) {
      console.error('Room exists')
      return
    }

    addRoom({
      isPrivate,
      participants: isPrivate ? participants : getAllUsersEmails(),
      roomName: roomName,
      messages: [],
    })

    if (!isPrivate) {
      io.emit(SocketEvents.addRoomToList, getRoom(roomName))
      io.socketsJoin(roomName)
      return
    }

    participants.map((email: string) => {
      const id = getSession(email)?.socketId
      if (!id) {
        return
      }
      io.to(id).emit(SocketEvents.inviteToRoom, roomName)
    })

    onJoinToRoom.bind(this, {
      roomName,
      userEmail: this.handshake.auth.userEmail,
    })()
  }

  return { onSendMessage, onJoinToRoom, onCreateRoom }
}

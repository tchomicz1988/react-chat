import { User } from '@authorizerdev/authorizer-js'
import { Socket } from 'socket.io'
import { Server as SocketIOServer } from 'socket.io'
import { SocketEvents } from '../../shared/shared.model'
import { ServerStore } from '../stores/serverStore'

export const sessionHandler = (io: SocketIOServer, store: ServerStore) => {
  const {
    getOpenRoomsNames,
    getClosedRoomsByParticipant,
    addUserToRoom,
    getOpenRooms,
    addSession,
    getChatUsers,
    deleteSession,
  } = store

  const addUserSession = (incomingUser: User, socket: Socket) => {
    socket.handshake.auth.userEmail = incomingUser.email

    addSession(incomingUser.email, {
      ...incomingUser,
      socketId: socket.id,
    })
  }

  const emitUsers = () => {
    io.emit(SocketEvents.updateUsers, getChatUsers())
  }

  const onCreateSession = function (this: Socket, incomingUser: User) {
    if (!incomingUser?.email) {
      return
    }

    const openRoomsNames = getOpenRoomsNames()
    const closedRooms = getClosedRoomsByParticipant(incomingUser?.email)
    const roomsNames = [
      ...openRoomsNames,
      ...closedRooms.map(({ roomName }) => roomName),
    ]

    addUserSession(incomingUser, this)
    this.join(roomsNames)
    openRoomsNames.forEach((roomName: string) => {
      addUserToRoom(roomName, incomingUser.email)
    })
    emitUsers()
    this.emit(SocketEvents.updateRoomsList, [...getOpenRooms(), ...closedRooms])
  }

  const onDisconnect = function (this: Socket) {
    if (!this.handshake.auth.userEmail) {
      return
    }

    deleteSession(this.handshake.auth.userEmail)
    emitUsers()
  }

  return { onCreateSession, onDisconnect }
}

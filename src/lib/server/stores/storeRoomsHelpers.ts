import { ChatRoom } from '../../client/models/chat.model'
import { StoreRooms } from './serverStore'

export type RoomsHelpers = {
  addRoom: (room: ChatRoom) => void
  addUserToRoom: (roomName: string, userEmail: string) => void
  getOpenRooms: () => ChatRoom[]
  getOpenRoomsNames: () => string[]
  getRoom: (roomName: string) => ChatRoom | undefined
  getClosedRoomsByParticipant: (userEmail: string) => ChatRoom[]
  hasRoom: (roomName: string) => boolean
}

export const storeRoomsHelpers = (roomsStore: StoreRooms): RoomsHelpers => {
  const addRoom = (room: ChatRoom) => {
    roomsStore.set(room.roomName, room)
  }

  const addUserToRoom = (roomName: string, userEmail: string) => {
    const room: ChatRoom | undefined = roomsStore.get(roomName)
    if (!room) {
      return
    }
    const participants = new Set([...room.participants, userEmail])
    room.participants = Array.from(participants)

    roomsStore.set(roomName, room)
  }

  const getOpenRooms = () => {
    return Array.from(roomsStore.values()).filter(
      (room: ChatRoom) => !room.isPrivate
    )
  }

  const getOpenRoomsNames = () => {
    return getOpenRooms().map(({ roomName }) => roomName)
  }

  const getRoom = (roomName: string) => {
    return roomsStore.get(roomName)
  }

  const getClosedRoomsByParticipant = (userEmail: string) => {
    return Array.from(roomsStore.values()).filter(
      (room: ChatRoom) =>
        room.participants.includes(userEmail) && room.isPrivate
    )
  }

  const hasRoom = (roomName: string) => {
    return roomsStore.has(roomName)
  }

  return {
    addRoom,
    addUserToRoom,
    getOpenRooms,
    getOpenRoomsNames,
    getRoom,
    getClosedRoomsByParticipant,
    hasRoom,
  }
}

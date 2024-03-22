import {
  ChatDefaultRooms,
  ChatUser,
  ChatRoom,
} from '../../client/models/chat.model'
import { RoomsHelpers, storeRoomsHelpers } from './storeRoomsHelpers'
import { SessionsHelpers, storeSessionsHelpers } from './storeSessionsHelpers'

export type ServerStore = SessionsHelpers & RoomsHelpers
export type StoreRooms = Map<string, ChatRoom>
export type StoreSessions = Map<string, ChatUser>

export const serverStore = (): ServerStore => {
  const sessionStore: StoreSessions = new Map<string, ChatUser>()
  const roomsStore: StoreRooms = new Map<string, ChatRoom>([
    [
      ChatDefaultRooms.general,
      {
        isPrivate: false,
        participants: [],
        roomName: ChatDefaultRooms.general,
        messages: [],
      },
    ],
  ])
  const {
    addSession,
    deleteSession,
    getAllUsersEmails,
    getChatUsers,
    getSession,
  } = storeSessionsHelpers(sessionStore)
  const {
    addRoom,
    addUserToRoom,
    getOpenRooms,
    getOpenRoomsNames,
    getRoom,
    getClosedRoomsByParticipant,
    hasRoom,
  } = storeRoomsHelpers(roomsStore)

  return {
    addRoom,
    addSession,
    addUserToRoom,
    deleteSession,
    getAllUsersEmails,
    getChatUsers,
    getOpenRooms,
    getOpenRoomsNames,
    getRoom,
    getClosedRoomsByParticipant,
    getSession,
    hasRoom,
  }
}

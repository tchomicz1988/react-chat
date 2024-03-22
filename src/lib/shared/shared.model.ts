import { ChatRoom, ChatRoomMessage } from '../client/models/chat.model'

export enum SocketEvents {
  addRoomToList = 'addRoomToList',
  connected = 'connected',
  connect_error = 'connect_error',
  connection = 'connection',
  createRoom = 'createRoom',
  createSession = 'createSession',
  disconnect = 'disconnect',
  inviteToRoom = 'inviteToRoom',
  joinToRoom = 'joinToRoom',
  privateMessage = 'privateMessage',
  sendMessage = 'sendMessage',
  updateMessages = 'updateMessages',
  updateRoomsList = 'updateRoomsList',
  updateUsers = 'updateUsers',
}

export type EventUpdateMessages = {
  roomName: string
  messages: ChatRoomMessage[]
}

export type EventAddMessage = {
  roomName: string
  message: ChatRoomMessage
  to: string
  isPrivate: boolean
}

export type EventJoinToRoom = {
  roomName: string
  userEmail: string
}

export type EventCreateRoom = Omit<ChatRoom, 'messages'>

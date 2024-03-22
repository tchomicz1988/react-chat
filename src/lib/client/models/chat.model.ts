import { User } from '@authorizerdev/authorizer-js'
import { EventAddMessage } from '../../shared/shared.model'

export enum ChatDefaultRooms {
  general = 'general',
}
export type ChatUser = User & {
  socketId?: string
}

export type ChatMessageProps = Omit<EventAddMessage, 'to' | 'isPrivate'>

export type ChatRoomMessage = {
  value: string
  from: ChatUser
}

export type ChatActiveRoom = {
  isPrivate: boolean
  to: string
  roomName: string
}
export type ChatRoom = {
  isPrivate: boolean
  participants: string[]
  roomName: string
  messages: ChatRoomMessage[]
}

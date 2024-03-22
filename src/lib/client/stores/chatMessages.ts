import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EventUpdateMessages } from '../../shared/shared.model'
import { RootState } from './store'
import { ChatMessageProps, ChatRoomMessage } from '../models/chat.model'
export interface ChatStoreMessages {
  [k: string]: ChatRoomMessage[]
}

type MessagesState = {
  messages: ChatStoreMessages
}

const initialState: MessagesState = {
  messages: {},
}

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    updateMessages: (state, action: PayloadAction<EventUpdateMessages>) => {
      state.messages[action.payload.roomName] = action.payload.messages
    },
    addMessage: (state, action: PayloadAction<ChatMessageProps>) => {
      state.messages[action.payload.roomName] = [
        ...(state.messages[action.payload?.roomName] || []),
        action.payload.message,
      ]
    },
  },
})

export const { updateMessages, addMessage } = messagesSlice.actions

export const selectMessages = (state: RootState) => state.messages.messages
export default messagesSlice.reducer

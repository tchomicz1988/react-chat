import { configureStore } from '@reduxjs/toolkit'

import roomsReducer from './chatRooms'
import usersReducer from './chatUsers'
import messagesReducer from './chatMessages'

export const store = configureStore({
  reducer: {
    rooms: roomsReducer,
    users: usersReducer,
    messages: messagesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

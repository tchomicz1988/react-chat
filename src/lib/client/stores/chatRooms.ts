import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EventCreateRoom } from '../../shared/shared.model'
import { RootState } from './store'

type ChatRoomsState = {
  value: EventCreateRoom[]
}

const initialState: ChatRoomsState = {
  value: [],
}

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    updateRooms: (state, action: PayloadAction<EventCreateRoom[]>) => {
      state.value = Array.from(action.payload)
    },
    addRoom: (state, action: PayloadAction<EventCreateRoom>) => {
      const hasRoom = !!state.value.find(
        ({ roomName }) => roomName === action.payload.roomName
      )

      if (hasRoom) {
        return
      }

      state.value = [...state.value, action.payload]
    },
  },
})

export const { updateRooms, addRoom } = roomsSlice.actions

export const selectRooms = (state: RootState) => state.rooms.value
export default roomsSlice.reducer

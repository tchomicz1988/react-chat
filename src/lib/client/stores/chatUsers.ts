import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
import { ChatUser } from '../models/chat.model'

type UsersState = {
  value: ChatUser[]
}

const initialState: UsersState = {
  value: [],
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUsers: (state, action: PayloadAction<ChatUser[]>) => {
      const setOfUsers = new Set(action.payload)

      state.value = Array.from(setOfUsers)
    },
  },
})

export const { updateUsers } = usersSlice.actions

export const selectUsers = (state: RootState) => state.users.value
export default usersSlice.reducer

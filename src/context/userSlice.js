import { createSlice } from '@reduxjs/toolkit'

const initialState = [{
  userName: '',
  token: ''
}]

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, actions) => {
      state.splice(0, 1, actions.payload)
    }
  }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer

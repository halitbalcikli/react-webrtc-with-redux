import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: '',
  activeUsers: []
};

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload
    },
    setActiveUsers: (state, action) => {
      state.activeUsers = action.payload
    }
  },
})

export const { setUsername, setActiveUsers } = videoSlice.actions

export const username = state => state.video.username;
export const activeUsers = state => state.video.activeUsers;

export default videoSlice.reducer;
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


// const reducer = (state = initState, action) => {
//   switch (action.type) {
//     case dashboardActions.DASHBOARD_SET_USERNAME:
//       return {
//         ...state,
//         username: action.username
//       };
//     case dashboardActions.DASHBOARD_SET_ACTIVE_USERS:
//       return {
//         ...state,
//         activeUsers: action.activeUsers
//       };
//     default:
//       return state;
//   }
// }
// ;

import { configureStore } from '@reduxjs/toolkit'
import videoReducer from './reducers/videoReducer'
import callReducer from './reducers/callReducer'

const store = configureStore({
  reducer: {
    video: videoReducer,
    call: callReducer
  },
})

export default store;
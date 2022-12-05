import { createSlice } from '@reduxjs/toolkit'

export const callStates = {
  'CALL_AVAILABLE': 'CALL_AVAILABLE',
  'CALL_UNAVAILABLE': 'CALL_UNAVAILABLE',
  'CALL_IN_PROGRESS': 'CALL_IN_PROGRESS',
  'CALL_REQUESTED': 'CALL_REQUESTED'
}

const initialState = {
  localStream: null,
  callState: callStates.CALL_UNAVAILABLE,
  callingDialogVisible: false,
  callerUsername: '',
  callRejected: {
    rejected: false,
    reason: ''
  },
  remoteStream: null,
  localCameraEnabled: true,
  localMicrophoneEnabled: true,
  screenSharingActive: false,
};

export const callSlice = createSlice({
  name: 'call',
  initialState,
  reducers: {
    setLocalStream: (state, action) => {
      console.log("action", action.payload)
      state.localStream = action.payload
    },
    setCallState: (state, action) => {
      state.callState = action.payload
    },
    setCallingDialogVisible: (state, action) => {
      state.callingDialogVisible = action.payload
    },
    setCallerUsername: (state, action) => {
      state.callerUsername = action.payload
    },
    setCallRejected: (state, action) => {
      state.callRejected = action.payload;
    },
    setRemoteStream: (state, action) => {
      state.remoteStream = action.payload
    },
    setLocalCameraEnabled: (state, action) => {
      state.localCameraEnabled = action.payload
    },
    setMicrophoneEnabled: (state, action) => {
      state.localMicrophoneEnabled = action.payload
    },
    setScreenSharingActive: (state, action) => {
      state.screenSharingActive = action.payload
    },
  },
})

export const {
  setLocalStream,
  setCallState,
  setCallingDialogVisible,
  setCallerUsername,
  setCallRejected,
  setRemoteStream,
  setLocalCameraEnabled,
  setScreenSharingActive,
  setMicrophoneEnabled,
} = callSlice.actions

export const localStream = state => state.call.localStream;

export default callSlice.reducer


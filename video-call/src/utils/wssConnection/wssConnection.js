import socketClient from 'socket.io-client';
import { setActiveUsers } from '../../store/reducers/videoReducer';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callStates, setCallerUsername, setCallState, setCallingDialogVisible, localStream } from '../../store/reducers/callReducer';
import * as webRTCHandler from '../webRTC/webRTCHandler'

const SERVER = 'http://localhost:3001';

const broadcastEventTypes = {
  ACTIVE_USERS: 'ACTIVE_USERS',
};

const preOfferAnswers = {
  CALL_ACCEPTED: 'CALL_ACCEPTED',
  CALL_REJECTED: 'CALL_REJECTED',
  CALL_NOT_AVAILABLE: 'CALL_NOT_AVAILABLE'
};

let socket;

export const useSocketEvents = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket = socketClient(SERVER);

    socket.on('connection', () => {
      console.log('succesfully connected with wss server');
      console.log(socket.id);
    });

    socket.on('broadcast', (data) => {
      switch (data.event) {
        case broadcastEventTypes.ACTIVE_USERS:
          const activeUsers = data.activeUsers.filter(activeUser => activeUser.socketId !== socket.id);
          dispatch(setActiveUsers(activeUsers));
          break;
        default:
          break;
      }
    });

    socket.on('pre-offer', (data) => {
      if (data.call.localStream === null || data.call.callState !== callStates.CALL_AVAILABLE) {
        sendPreOfferAnswer({
          callerSocketId: data.callerSocketId,
          answer: preOfferAnswers.CALL_NOT_AVAILABLE
        });
      } else {
        webRTCHandler.handlePreOffer(data)
        dispatch(setCallerUsername(data.callerUsername))
        dispatch(setCallState(callStates.CALL_REQUESTED))
      }
    })

    socket.on('pre-offer-answer', (data) => {
      dispatch(setCallingDialogVisible(false));
      const { rejectionReason } = webRTCHandler.handlePreOfferAnswer(data);
      console.log("rejectionReason", rejectionReason)
    });

    socket.on('webRTC-offer', (data) => {
      webRTCHandler.handleOffer(data);
    });

    socket.on('webRTC-answer', (data) => {
      webRTCHandler.handleAnswer(data);
    });

    socket.on('webRTC-candidate', (data) => {
      webRTCHandler.handleCandidate(data);
    });

    socket.on('user-hanged-up', () => {
      webRTCHandler.handleUserHangedUp();
    });

  }, [dispatch]);
}

export const registerNewUser = (username) => {
  socket.emit('new_user', {
    username: username,
    socketId: socket.id
  });
};

// emitting events to server related with direct call

export const sendPreOffer = (data) => {
  socket.emit('pre-offer', data);
};

export const sendPreOfferAnswer = (data) => {
  console.log("data is here", data)
  socket.emit('pre-offer-answer', data);
};

export const sendWebRTCOffer = (data) => {
  socket.emit('webRTC-offer', data);
};

export const sendWebRTCAnswer = (data) => {
  socket.emit('webRTC-answer', data);
};

export const sendWebRTCCandidate = (data) => {
  socket.emit('webRTC-candidate', data);
};

export const sendUserHangedUp = (data) => {
  socket.emit('user-hanged-up', data);
};


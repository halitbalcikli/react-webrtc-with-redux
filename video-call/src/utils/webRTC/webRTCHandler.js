import store from '../../store/store';
import {
  callStates,
  setCallState,
  setRemoteStream,
} from '../../store/reducers/callReducer';
import * as wss from '../wssConnection/wssConnection';

const preOfferAnswers = {
  CALL_ACCEPTED: 'CALL_ACCEPTED',
  CALL_REJECTED: 'CALL_REJECTED',
  CALL_NOT_AVAILABLE: 'CALL_NOT_AVAILABLE'
};

const configuration = {};

let connectedUserSocketId;
let peerConnection;

export const createPeerConnection = (dispatch, stream) => {
  peerConnection = new RTCPeerConnection(configuration);
  const localStream = stream;

  for (const track of localStream.getTracks()) {
    peerConnection.addTrack(track, localStream);
  }

  peerConnection.ontrack = ({ streams: [stream] }) => {
    dispatch(setRemoteStream(stream));
  };

  peerConnection.onicecandidate = (event) => {
    console.log('geeting candidates from stun server');
    if (event.candidate) {
      wss.sendWebRTCCandidate({
        candidate: event.candidate,
        connectedUserSocketId: connectedUserSocketId
      });
    }
  };

  peerConnection.onconnectionstatechange = (event) => {
    if (peerConnection.connectionState === 'connected') {
      console.log('succesfully connected with other peer');
    }
  };
};

export const callToOtherUser = (calleeDetails, call) => {
  connectedUserSocketId = calleeDetails.socketId;
  wss.sendPreOffer({
    callee: calleeDetails,
    caller: {
      username: call.callerUsername
    },
    call: call
  });
};

export const handlePreOffer = (data) => {
  connectedUserSocketId = data.callerSocketId;
};

export const acceptIncomingCallRequest = (dispatch) => {
  wss.sendPreOfferAnswer({
    callerSocketId: connectedUserSocketId,
    answer: preOfferAnswers.CALL_ACCEPTED
  });

  dispatch(setCallState(callStates.CALL_IN_PROGRESS));
};

export const rejectIncomingCallRequest = (dispatch) => {
  wss.sendPreOfferAnswer({
    callerSocketId: connectedUserSocketId,
    answer: preOfferAnswers.CALL_REJECTED
  });
  // resetCallData(dispatch);
};

export const handlePreOfferAnswer = (data) => {
  if (data.answer === preOfferAnswers.CALL_ACCEPTED) {
    sendOffer();
  } else {
    let rejectionReason;
    if (data.answer === preOfferAnswers.CALL_NOT_AVAILABLE) {
      rejectionReason = 'Callee is not able to pick up the call right now';
    } else {
      rejectionReason = 'Call rejected by the callee';
    }
    // dispatch(setCallRejected({
    //   rejected: true,
    //   reason: rejectionReason
    // }));
    return rejectionReason

    // resetCallData();
  }
};

const sendOffer = async () => {
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  wss.sendWebRTCOffer({
    calleeSocketId: connectedUserSocketId,
    offer: offer
  });
};

export const handleOffer = async (data) => {
  await peerConnection.setRemoteDescription(data.offer);
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  console.log("answer", answer)
  wss.sendWebRTCAnswer({
    callerSocketId: connectedUserSocketId,
    answer: answer
  });
};

export const handleAnswer = async (data) => {
  await peerConnection.setRemoteDescription(data.answer);
};

export const handleCandidate = async (data) => {
  try {
    console.log('adding ice candidates');
    await peerConnection.addIceCandidate(data.candidate);
  } catch (err) {
    console.error('error occured when trying to add received ice candidate', err);
  }
};

export const handleUserHangedUp = () => {
  resetCallDataAfterHangUp();
};

export const hangUp = () => {
  wss.sendUserHangedUp({
    connectedUserSocketId: connectedUserSocketId
  });

  resetCallDataAfterHangUp();
};

const resetCallDataAfterHangUp = () => {
  peerConnection.close();
  peerConnection = null;
  createPeerConnection();

  const localStream = store.getState().call.localStream;
  localStream.getVideoTracks()[0].enabled = true;
  localStream.getAudioTracks()[0].enabled = true;
};

export const resetCallData = (dispatch) => {
  connectedUserSocketId = null;
  // dispatch(setCallState(callStates.CALL_AVAILABLE));
};

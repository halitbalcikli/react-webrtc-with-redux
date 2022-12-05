import React from 'react';
import { useSelector } from 'react-redux';
import { callStates } from '../../../store/reducers/callReducer';
import LocalVideoView from '../LocalVideoView/LocalVideoView';
import RemoteVideoView from '../RemoteVideoView/RemoteVideoView';
import CallRejectedDialog from '../CallRejectedDialog/CallRejectedDialog';
import IncomingCallDialog from '../IncomingCallDialog/IncomingCallDialog';
import CallingDialog from '../CallingDialog/CallingDialog';
import ConversationButtons from '../ConversationButtons/ConversationButtons';

const DirectCall = () => {
  const localStream = useSelector(state => state.call.localStream)
  const callState = useSelector(state => state.call.callState);
  const remoteStream = useSelector(state => state.call.remoteStream)
  const callingDialogVisible = useSelector(state => state.call.callingDialogVisible)
  const callRejected = useSelector(state => state.call.callRejected);

  return (
    <>
      <LocalVideoView localStream={localStream} />
      {remoteStream && callState === callStates.CALL_IN_PROGRESS && <RemoteVideoView remoteStream={remoteStream} />}
      {callRejected.rejected && <CallRejectedDialog
        reason={callRejected.reason}
      />}
      {callState === callStates.CALL_REQUESTED && <IncomingCallDialog />}
      {callingDialogVisible && <CallingDialog />}
      {remoteStream && callState === callStates.CALL_IN_PROGRESS && <ConversationButtons />}
    </>
  );
};

export default DirectCall;

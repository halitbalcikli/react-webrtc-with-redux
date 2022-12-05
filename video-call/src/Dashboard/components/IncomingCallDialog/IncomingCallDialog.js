import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { acceptIncomingCallRequest, rejectIncomingCallRequest } from '../../../utils/webRTC/webRTCHandler';

import './IncomingCallDialog.css';

const IncomingCallDialog = () => {
  const dispatch = useDispatch();

  const handleAcceptButtonPressed = () => {
    acceptIncomingCallRequest(dispatch);
  };

  const handleRejectButtonPressed = () => {
    rejectIncomingCallRequest(dispatch);
  };

  const callerUsername = useSelector(state => state.call.callerUsername);

  return (
    <div className='direct_call_dialog background_secondary_color'>
      <span className='direct_call_dialog_caller_name'>{callerUsername}</span>
      <div className='direct_call_dialog_button_container'>
        <button className='direct_call_dialog_accept_button' onClick={handleAcceptButtonPressed}>
          Accept
        </button>
        <button className='direct_call_dialog_reject_button' onClick={handleRejectButtonPressed}>
          Reject
        </button>
      </div>
    </div>
  );
};

export default IncomingCallDialog;

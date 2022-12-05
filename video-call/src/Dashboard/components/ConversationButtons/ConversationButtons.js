import React from 'react';
import { MdCallEnd, MdMic, MdMicOff, MdVideocam, MdVideocamOff } from 'react-icons/md';
import { hangUp } from '../../../utils/webRTC/webRTCHandler';
import ConversationButton from './ConversationButton';
import { useSelector, useDispatch } from 'react-redux';
import { setMicrophoneEnabled, setLocalCameraEnabled } from '../../../store/reducers/callReducer'

const styles = {
  buttonContainer: {
    display: 'flex',
    position: 'absolute',
    bottom: '22%',
    left: '35%'
  },
  icon: {
    width: '25px',
    height: '25px',
    fill: '#e6e5e8'
  }
};

const ConversationButtons = () => {
  const dispatch = useDispatch();

  const localMicrophoneEnabled = useSelector(state => state.call.localMicrophoneEnabled);
  const localStream = useSelector(state => state.call.localStream);
  const localCameraEnabled = useSelector(state => state.call.localCameraEnabled)

  const handleMicButtonPressed = () => {
    const micEnabled = localMicrophoneEnabled;
    localStream.getAudioTracks()[0].enabled = !micEnabled;
    dispatch(setMicrophoneEnabled(!micEnabled));
  };

  const handleCameraButtonPressed = () => {
    const cameraEnabled = localCameraEnabled;
    localStream.getVideoTracks()[0].enabled = !cameraEnabled;
    dispatch(setLocalCameraEnabled(!cameraEnabled));
  };

  const handleHangUpButtonPressed = () => {
    hangUp();
  };

  return (
    <div style={styles.buttonContainer}>
      <ConversationButton onClickHandler={handleMicButtonPressed}>
        {localMicrophoneEnabled ? <MdMic style={styles.icon} /> : <MdMicOff style={styles.icon} />}
      </ConversationButton>
      <ConversationButton onClickHandler={handleHangUpButtonPressed}>
        <MdCallEnd style={styles.icon} />
      </ConversationButton>
      <ConversationButton onClickHandler={handleCameraButtonPressed}>
        {localCameraEnabled ? <MdVideocam style={styles.icon} /> : <MdVideocamOff style={styles.icon} />}
      </ConversationButton>
    </div>
  );
};

export default ConversationButtons;

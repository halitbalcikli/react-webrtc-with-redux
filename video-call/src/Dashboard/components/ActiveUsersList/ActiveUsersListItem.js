import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userAvatar from '../../../resources/userAvatar.png';
import { callToOtherUser } from '../../../utils/webRTC/webRTCHandler';
import { callStates, setCallState, setCallingDialogVisible } from '../../../store/reducers/callReducer';

const ActiveUsersListItem = (props) => {
  const { activeUser, callState } = props;
  const dispatch = useDispatch();
  const call = useSelector(state => state.call);

  const handleListItemPressed = () => {
    if (callState === callStates.CALL_AVAILABLE) {
      dispatch(setCallState(callStates.CALL_IN_PROGRESS));
      dispatch(setCallingDialogVisible(true));
      callToOtherUser(activeUser, call);
    }
  };

  return (
    <div className='active_user_list_item' onClick={handleListItemPressed}>
      <div className='active_user_list_image_container'>
        <img className='active_user_list_image' src={userAvatar} alt="avatar" />
      </div>
      <span className='active_user_list_text'>{activeUser.username}</span>
    </div>
  );
};

export default ActiveUsersListItem;

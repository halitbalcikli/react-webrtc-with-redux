import React from 'react';
import { useSelector } from 'react-redux';
import ActiveUsersListItem from './ActiveUsersListItem';

import './ActiveUsersList.css';

const ActiveUsersList = () => {
  const activeUsers = useSelector(state => state.video.activeUsers);
  const callState = useSelector(state => state.call.callState);

  return (
    <div className='active_user_list_container'>
      {activeUsers.map((activeUser) =>
        <ActiveUsersListItem
          key={activeUser.socketId}
          activeUser={activeUser}
          callState={callState}
        />)}
    </div>
  );
};

export default ActiveUsersList;

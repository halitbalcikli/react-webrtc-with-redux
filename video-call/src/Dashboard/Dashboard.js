import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import turkcell from '../resources/turkcell.png';
import ActiveUsersList from './components/ActiveUsersList/ActiveUsersList';
import { getLocalStream, createPeerConnection } from '../utils/webRTC/webRTCHandler';
import DirectCall from './components/DirectCall/DirectCall';
import { setLocalStream, setCallState, callStates } from '../store/reducers/callReducer';
import './Dashboard.css'
// import DashboardInformation from './components/DashboardInformation/DashboardInformation';
// import { callStates } from '../store/reducers/callReducer';

import './Dashboard.css';

const defaultConstrains = {
  video: true,
  audio: true
};

const Dashboard = ({ username, callState }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia(defaultConstrains)
      .then(stream => {
        dispatch(setLocalStream(stream));
        dispatch(setCallState(callStates.CALL_AVAILABLE));
        createPeerConnection(dispatch, stream);
      })
      .catch(err => {
        console.log('error occured when trying to get an access to get local stream');
        console.log(err);
      });
  }, [dispatch]);

  return (
    <div className='dashboard_container background_main_color'>
      <div className='dashboard_left_section'>
        <div className='dashboard_content_container'>
          <DirectCall />
          {/* {callState !== callStates.CALL_IN_PROGRESS && <DashboardInformation username={username} />} */}
        </div>
      </div>
      <div className='dashboard_right_section background_secondary_color'>
        <div className='dashboard_active_users_list'>
          <ActiveUsersList />
        </div>
        <div className='dashboard_logo_container'>
          <img className='dashboard_logo_image' src={turkcell} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

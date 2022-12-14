import React, { useState } from 'react';
import UsernameInput from './components/UsernameInput';
import SubmitButton from './components/SubmitButton';
import { useNavigate } from 'react-router-dom';
import { registerNewUser } from '../utils/wssConnection/wssConnection';
import './LoginPage.css';

const LoginPage = ({ saveUsername }) => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmitButtonPressed = () => {
    registerNewUser(username);
    // saveUsername(username);
    navigate('/dashboard');
  };

  return (
    <div className='login-page_container background_main_color'>
      <div className='login-page_login_box background_secondary_color'>
        <div className='login-page_title_container'>
          <h2>Get on Board</h2>
        </div>
        <UsernameInput username={username} setUsername={setUsername} />
        <SubmitButton handleSubmitButtonPressed={handleSubmitButtonPressed} />
      </div>
    </div>
  );
};


export default LoginPage;

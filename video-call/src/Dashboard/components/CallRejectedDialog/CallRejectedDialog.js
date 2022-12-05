import React from 'react';
import './CallRejectedDialog.css';

const CallRejectedDialog = ({ reason }) => {
  return (
    <div className='call_rejected_dialog background_secondary_color'>
      <span>
        {reason}
      </span>
    </div>
  );
};

export default CallRejectedDialog;

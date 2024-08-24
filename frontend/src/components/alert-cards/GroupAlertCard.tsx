import React from 'react';
import { Alert } from '../../pages/Alerts';
import { AddUserIcon, CheckIcon } from '../../icons';
import Avatar from '../avatar/Avatar';

type GroupAlertCardProps = {
    alert: Alert
 }
const GroupAlertCard: React.FC<GroupAlertCardProps> = ({alert}) => {
    const alerter = alert.alerter;

  return (
    <div className="alert-card follow-alert">
    <div className="alert-type">
      <AddUserIcon color="#5448ee" size={16} />
      <p className="alerter-username">{alerter.username}</p>
      <span>{alert.msg}</span>
    </div>
    <div className="user-wrapper">
      <Avatar src={alerter.avatar} username={alerter.username} />
      <div className="text">
        <p className="name">
          {alerter.name}
          {alerter.isVerified && <CheckIcon size={20} color="#ff4775" />}
        </p>
        <p className="username">@{alerter.username}</p>
      </div>
    </div>
    <div className="btn">
      <button className='follow-btn'>Open</button>
    </div>

  </div>
  );
};

export default GroupAlertCard;
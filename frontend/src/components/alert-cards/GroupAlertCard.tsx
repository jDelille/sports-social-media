import React from 'react';
import { Alert } from '../../pages/Alerts';
import { GroupAddIcon } from '../../icons';
import Avatar from '../avatar/Avatar';
import { Link, useNavigate } from 'react-router-dom';
import { COLOR_CONSTANTS } from '../../constants';

type GroupAlertCardProps = {
    alert: Alert
 }
const GroupAlertCard: React.FC<GroupAlertCardProps> = ({alert}) => {
  const navigate = useNavigate();
    const alerter = alert.alerter;
    const group = alert.group_info;

    const handleClick = () => {
      navigate(alert.link)
    }

  return (
    <div className="alert-card follow-alert">
    <div className="alert-type">
      <GroupAddIcon color={COLOR_CONSTANTS.REPOST_COLOR} size={16} />
      <Link to={`/profile/${alerter.username}`} className="alerter-username">{alerter.username}</Link>
      <span>{alert.msg}</span>
    </div>
    <div className="group-wrapper">
      <Avatar src={group.avatar} username={group.id} isGroup />
      <div className="text">
        <p className="name">
          {group.name}
        </p>
        <p className="username">{group.description}</p>
      </div>
    </div>
    <div className="btn">
      <button className='follow-btn' onClick={handleClick}>Open</button>
    </div>

  </div>
  );
};

export default GroupAlertCard;
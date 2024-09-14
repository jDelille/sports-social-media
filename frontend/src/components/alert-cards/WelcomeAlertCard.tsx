import React from 'react';
import './alertCard.scss';
import { Alert } from '../../pages/Alerts';
import { PartyIcon } from '../../icons';
import { COLOR_CONSTANTS } from '../../constants';

type WelcomeAlertCardProps = {
    alert: Alert;
 }
const WelcomeAlertCard: React.FC<WelcomeAlertCardProps> = ({alert}) => {
  return (
    <div className="alert-card">
      <div className="alert-type">
        <PartyIcon size={16} color={COLOR_CONSTANTS.LIKE_COLOR} />
        <p></p>
        <span>{alert.msg}</span>
      </div>
      <div className="alert-content">
        Welcome to Huddle, a sports betting community where you can view sports odds, bets, user picks and posts, and much more! Get started by scrolling through the feed and interacting with other users. This site is still in its beta phase so please excuse all the bugs, and if you do see any bugs or missing features you'd like to see implemented, do not hesistate to reach out. Have fun!
      </div>
    </div>
  );
};

export default WelcomeAlertCard;
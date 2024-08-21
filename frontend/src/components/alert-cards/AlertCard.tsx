import { Alert } from "../../pages/Alerts";
import FollowAlertCard from "./FollowAlertCard";
import PostAlertCard from "./PostAlertCard";

const AlertCard: React.FC<{ alert: Alert }> = ({ alert }) => {
  switch (alert.type) {
    case 'follow':
      return <FollowAlertCard alert={alert} />;
    case 'post':
      return <PostAlertCard alert={alert} />
    default:
      return <div>Unknown alert type</div>;
  }
};

export default AlertCard;
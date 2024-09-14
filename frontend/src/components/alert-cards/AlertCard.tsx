import { Alert } from "../../pages/Alerts";
import FollowAlertCard from "./FollowAlertCard";
import GroupAlertCard from "./GroupAlertCard";
import PostAlertCard from "./PostAlertCard";
import WelcomeAlertCard from "./WelcomeAlertCard";

const AlertCard: React.FC<{ alert: Alert }> = ({ alert }) => {
  switch (alert.type) {
    case 'follow':
      return <FollowAlertCard alert={alert} />;
    case 'post':
      return <PostAlertCard alert={alert} />
    case 'group-invite':
      return <GroupAlertCard alert={alert} />
    case 'welcome': 
      return <WelcomeAlertCard alert={alert} />
    default:
      return <div>Unknown alert type</div>;
  }
};

export default AlertCard;
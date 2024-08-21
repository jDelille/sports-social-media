import { Alert } from "../../pages/Alerts";
import FollowAlertCard from "./FollowAlertCard";

const AlertCard: React.FC<{ alert: Alert }> = ({ alert }) => {
  switch (alert.type) {
    case 'follow':
      return <FollowAlertCard alert={alert} />;
    // Add cases for other alert types as needed
    default:
      return <div>Unknown alert type</div>;
  }
};

export default AlertCard;
import React, { useEffect, useState } from "react";
import { useAxios } from "../hooks";
import { PageHeader } from "../components";
import AlertCard from "../components/alert-cards/AlertCard";
import FeedSelector from "../components/feed-selector/FeedSelector";
import "./page.scss";

export type Alert = {
  id: number;
  user_id: number;
  type: string;
  alerter_id: number | null;
  created_at: string;
  msg: string;
  post_id: number;
  link: string;
  comment_id: number;
  alerter: {
    id: number;
    name: string;
    username: string;
    avatar: string;
    isVerified: boolean;
  };
  group_info: {
    avatar: string;
    description: string;
    id: number;
    name: string;
    link: string;
  };
};

const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [selectedFeed, setSelectedFeed] = useState<string>("All");

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await useAxios.get("/alerts");
        setAlerts(response.data);
        await useAxios.put("/alerts/mark-as-read");
      } catch (error) {
        console.error("Failed to fetch alerts", error);
      }
    };

    fetchAlerts();
  }, []);

  const feeds = ["All", "Mentions", "Invites"]

  return (
    <div className="alerts-page page">
      <PageHeader title="Alerts" hasBack />
      <FeedSelector feeds={feeds} selectedFeed={selectedFeed} setSelectedFeed={setSelectedFeed}/>
      {alerts && (
        <ul>
          {alerts.map((alert, index) => (
            <AlertCard key={alert.id + index} alert={alert} />
          ))}
        </ul>
      )}

      {alerts.length === 0 && (
        <div className="empty">
          <p>
            You don't have any notifications yet. When other people interact
            with you, you will see it here.
          </p>
          <p></p>
        </div>
      )}
    </div>
  );
};

export default Alerts;

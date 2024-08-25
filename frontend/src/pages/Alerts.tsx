import React, { useEffect, useState } from "react";
import { useAxios } from "../hooks";
import { PageHeader } from "../components";
import AlertCard from "../components/alert-cards/AlertCard";
import './page.scss';

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
  }
};

const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await useAxios.get("/alerts");
        setAlerts(response.data);
      } catch (error) {
        console.error("Failed to fetch alerts", error);
      }
    };

    fetchAlerts();
  }, []);

  console.log(alerts)

  return (
    <div className="alerts-page page">
      <PageHeader title="Alerts" hasBack />
      <ul>
        {alerts.map((alert) => (
         <AlertCard alert={alert} />
        ))}
      </ul>
    </div>
  );
};

export default Alerts;

import React, { useEffect, useState } from "react";
import { PageHeader } from "../components";
import LeaderboardHeader from "../components/leaderboard/LeaderboardHeader";
import LeaderboardRows from "../components/leaderboard/LeaderboardRows";
import UserTypes from "../types/User";
import { useAxios } from "../hooks";
import { LeaderboardTypes } from "../types/LeaderboardTypes";

type LeaderboardProps = {};

export interface CombinedUserTypes extends UserTypes, LeaderboardTypes {}

const Leaderboard: React.FC<LeaderboardProps> = () => {
  const [users, setUsers] = useState<CombinedUserTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let res = await useAxios.get('/leaderboard');
        setUsers(res.data);
      } catch (err) {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };
      
    fetchUsers();
  }, []);

  return (
    <div className="page leaderboard-page">
      <PageHeader hasBack title="Leaderboard" />
      <LeaderboardHeader />
      <LeaderboardRows users={users} />
    </div>
  );
};

export default Leaderboard;

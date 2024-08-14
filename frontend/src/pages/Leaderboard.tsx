import React from 'react';
import { PageHeader } from '../components';
import LeaderboardHeader from '../components/leaderboard/LeaderboardHeader';
import LeaderboardRows from '../components/leaderboard/LeaderboardRows';

type LeaderboardProps = {
 
 }
const Leaderboard: React.FC<LeaderboardProps> = () => {
  return (
    <div className="page leaderboard-page">
      <PageHeader hasBack title='Leaderboard' />
      <LeaderboardHeader />
      <LeaderboardRows />
    </div>
  );
};

export default Leaderboard;
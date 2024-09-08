import React from 'react';
import { PageHeader } from '../components';
import useBetStats from '../hooks/bet-stats/useBetStats';
import './page.scss';

type BetHistoryProps = {
 
 }
const BetHistory: React.FC<BetHistoryProps> = () => {
    const { totalCount, winCount, lossCount } = useBetStats();

    const winPercentage = totalCount ? (winCount !== null ? (winCount / totalCount) * 100 : 0) : 0;

  return (
    <div className="page">
      <PageHeader title='Bet History' hasBack/>
      <div>Total Bets: {totalCount}</div>
      <div>Record {winCount} / {lossCount} </div>
      <div>You have a win percentage of {winPercentage.toFixed(0)}%</div>
    </div>
  );
};

export default BetHistory;
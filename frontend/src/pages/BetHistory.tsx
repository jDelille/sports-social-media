import React from 'react';
import { PageHeader } from '../components';
import useTotalBetCount from '../hooks/bet-stats/useTotalBetCount';
import './page.scss';

type BetHistoryProps = {
 
 }
const BetHistory: React.FC<BetHistoryProps> = () => {
    const { totalCount, loading, error } = useTotalBetCount();

  return (
    <div className="page">
      <PageHeader title='Bet History' hasBack/>
      <div>Total Bets: {totalCount}</div>
    </div>
  );
};

export default BetHistory;
import React from 'react';
import { PageHeader } from '../components';
import BetHistoryHeader from '../components/bet-history/BetHistoryHeader';
import './page.scss';

type BetHistoryProps = {
 
 }
const BetHistory: React.FC<BetHistoryProps> = () => {


  return (
    <div className="page">
      <PageHeader title='Bet History' hasBack/>
      <BetHistoryHeader />

    </div>
  );
};

export default BetHistory;
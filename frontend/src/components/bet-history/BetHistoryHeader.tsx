import React from "react";
import "./betHistory.scss";
import useBetStats from "../../hooks/bet-stats/useBetStats";
type BetHistoryHeaderProps = {};
const BetHistoryHeader: React.FC<BetHistoryHeaderProps> = () => {
  const { totalCount, winCount, lossCount } = useBetStats();

  const winPercentage = totalCount
    ? winCount !== null
      ? (winCount / totalCount) * 100
      : 0
    : 0;
  return (
    <div className="bet-history-header">
        <h2>Your bet summary</h2>
      <div className="balance">
        <div className="coins">
        <p className="label">Coin balance</p>
        <p className="coin-balance">$500</p>
        </div>
        <div className="profit">
            <p className="label">Profit</p>
            <p className="profit-balance">$1200</p>
        </div>
        <div className="record">
            <p className="label">Record</p>
            <p>{winCount}-0-{lossCount}</p>
        </div>
        <div className="streak">
            <p className="label">Win %</p>
            <p>{winPercentage.toFixed(0)}%</p>
        </div>
        <div className="total-bets">
            <p className="label">Total bets</p>
            <p>{totalCount}</p>
        </div>
      </div>
    </div>
  );
};

export default BetHistoryHeader;

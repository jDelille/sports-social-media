import React from "react";
import { CombinedUserTypes } from "../../pages/Leaderboard";
import "./leaderboardRows.scss";

type LeaderboardRowsProps = {
  users: CombinedUserTypes[];
};
const LeaderboardRows: React.FC<LeaderboardRowsProps> = ({ users }) => {

  return (
    <div className="leaderboard-rows">
      <div className="labels">
        <div className="place">#</div>
        <div className="player">Player</div>
        <div className="stats">
          <div className="wins">W</div>
          <div className="loss">L</div>
          <div className="wagered">Wagered</div>
          <div className="profit">Profit</div>
          <div className="odds">Avg Odds</div>
        </div>
      </div>
      {users.map((user) => (
        <div className="row">
          <div className="place">1</div>
          <p className="player">{user.username}</p>
          <div className="stats">
            <p className="wins">{user.wins}</p>
            <p className="loss">{user.losses}</p>
            <p className="wagered">{user.amount_wagered}</p>
            <p className="profit">{user.amount_won}</p>
            <div className="odds">{user.average_odds}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeaderboardRows;

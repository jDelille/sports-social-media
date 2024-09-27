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
          <div className="wins">Record (W-L)</div>
          <div className="profit">Profit</div>
          <div className="odds">Avg Odds</div>
        </div>
      </div>
      {users.map((user) => (
        <div className="row">
          <div className="place">1</div>

          <div className="player">
            <img src={user.avatar} alt="" />
            {user.username}
          </div>
          <div className="stats">
            <p className="wins">
              {user.wins} - {user.losses}
            </p>
            <p className="profit">{user.amount_won}</p>
            <div className="odds">{user.average_odds}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeaderboardRows;

import React from "react";
import "./leaderboardHeader.scss";

type LeaderboardHeaderProps = {};
const LeaderboardHeader: React.FC<LeaderboardHeaderProps> = () => {
  return (
    <div className="leaderboard-header">
      <h2>Season Standings</h2>
      <p className="description">
        Get insights into your top rankings and achievements. See how you
        compare with others and track your progress!
      </p>
      <p className="description">
        Get into the top 10 to earn this seasons reward.
      </p>
      <span>Season ends in 45 days</span>
    </div>
  );
};

export default LeaderboardHeader;

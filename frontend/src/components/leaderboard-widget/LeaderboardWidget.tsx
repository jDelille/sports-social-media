import React from "react";
import "./leaderboardWidget.scss";

type LeaderboardWidgetProps = {};
const LeaderboardWidget: React.FC<LeaderboardWidgetProps> = () => {
  return (
    <div className="leaderboard-widget">
      <p className="title">Leaderboard</p>
      <p className="description">
      <span>Join the race to the top!</span> Show your betting strategy and dominate the leaderboard.
      </p>
      <button>Learn More</button>
    </div>
  );
};

export default LeaderboardWidget;

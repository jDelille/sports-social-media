import React from "react";
import "./leaderboardWidget.scss";
import useLeaderboardInfoPopup from "../../hooks/popups/useLeaderboardInfoPopup";

type LeaderboardWidgetProps = {};
const LeaderboardWidget: React.FC<LeaderboardWidgetProps> = () => {
    const leaderboardInfo = useLeaderboardInfoPopup();

  return (
    <div className="leaderboard-widget">
      <p className="title">Leaderboard</p>
      <p className="description">
      <span>Join the race to the top!</span> Show your betting strategy and dominate the leaderboard.
      </p>
      <button onClick={leaderboardInfo.onOpen}>Learn More</button>
    </div>
  );
};

export default LeaderboardWidget;

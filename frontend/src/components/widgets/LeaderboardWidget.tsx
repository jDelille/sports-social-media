import React, { useContext, useEffect, useState } from "react";
import useLeaderboardInfoPopup from "../../hooks/popups/useLeaderboardInfoPopup";
import { useAxios } from "../../hooks";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import "./widget.scss";

type LeaderboardWidgetProps = {};

const LeaderboardWidget: React.FC<LeaderboardWidgetProps> = () => {
  const [isParticipant, setIsParticipant] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const leaderboardInfo = useLeaderboardInfoPopup();
  const { currentUser } = useContext(AuthContext) || {};
  const navigate = useNavigate();

  useEffect(() => {
    const checkIfParticipant = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await useAxios.get("/leaderboard/participant");
        setIsParticipant(response.data.isParticipant);
      } catch (err) {
        setError("Failed to load leaderboard status.");
        console.error("Error checking participant status:", err);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.id) {
      checkIfParticipant();
    }
  }, [currentUser?.id]);

  const handleGoToLeaderboardClick = () => {
    navigate("/leaderboard");
  };

  return (
    <div className="widget">
      <p className="title">Leaderboard</p>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : !isParticipant ? (
        <>
          <p className="description">
            <span>Join the race to the top!</span> Show your betting strategy
            and dominate the leaderboard.
          </p>
          <button onClick={leaderboardInfo.onOpen}>Learn More</button>
        </>
      ) : (
        <>
          <p className="description">You are currently in 1st place</p>
          <button onClick={handleGoToLeaderboardClick} className="standings-btn">View Standings</button>
        </>
      )}
    </div>
  );
};

export default LeaderboardWidget;

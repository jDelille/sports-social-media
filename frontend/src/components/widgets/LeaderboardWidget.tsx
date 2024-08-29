import React, { useContext, useEffect, useState } from "react";
import useLeaderboardInfoPopup from "../../hooks/popups/useLeaderboardInfoPopup";
import "./widget.scss";
import { useAxios } from "../../hooks";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

type LeaderboardWidgetProps = {};
const LeaderboardWidget: React.FC<LeaderboardWidgetProps> = () => {
  const [isParticipant, setIsParticipant] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const leaderboardInfo = useLeaderboardInfoPopup();
  const { currentUser } = useContext(AuthContext) || {};
  const navigate = useNavigate();

  useEffect(() => {
    const checkIfParticipant = async () => {
      try {
        const response = await useAxios.get("/leaderboard/participant");
        setIsParticipant(response.data.isParticipant);
      } catch (err) {
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    checkIfParticipant();
  }, [currentUser.id]);

  console.log(isParticipant);

  const handleGoToLeaderboardClick = () => {
    navigate('/leaderboard');
  }

  return (
    <div className="widget">
      <p className="title">Leaderboard</p>
      {!isParticipant ? (
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
        <button onClick={handleGoToLeaderboardClick}>View Standings</button>

        </>
      )}
    </div>
  );
};

export default LeaderboardWidget;

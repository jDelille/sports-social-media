import React, { useState, useEffect, useContext } from "react";
import betslipStore from "../../store/betslipStore";
import Toggle from "../toggle/Toggle";
import "./betcontrols.scss";
import { useAxios } from "../../hooks";
import { AuthContext } from "../../context/AuthContext";

type BetControlsProps = {};
const BetControls: React.FC<BetControlsProps> = () => {
  const [parlayChecked, setParlayChecked] = useState(betslipStore.isParlay);
  const [decimalChecked, setDecimalChecked] = useState(
    betslipStore.decimalOdds
  );
  const [participantChecked, setParticipantChecked] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const betstore = betslipStore;
  const [isParticipant, setIsParticipant] = useState(false);

  const {currentUser} = useContext(AuthContext) || {};

  useEffect(() => {
    setParlayChecked(betstore.isParlay);
  }, [betstore.isParlay]);

  const handleParlayToggle = () => {
    setParlayChecked(!parlayChecked);
    betstore.toggleParlay();
  };

  const handleDecimalToggle = () => {
    setDecimalChecked(!decimalChecked);
    betstore.toggleDecimalOdds();
  };

  const handleParticipantToggle = () => {
    setParticipantChecked(!participantChecked);
  }

  useEffect(() => {
    const checkIfParticipant = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await useAxios.get("/leaderboard/participant");
        setIsParticipant(response.data.isParticipant);
        betstore.setIsParticipant(response.data.isParticipant);
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

  return (
    <div className="bet-controls">
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <div className="control">
          <div className="parlay">
            <div className="text">
              <p className="title">Parlay</p>
              <span className="info">
                Turning this on will remove individual bets.
              </span>
            </div>
            <Toggle
              handleToggle={handleParlayToggle}
              isToggled={parlayChecked}
            />
          </div>
          {isParticipant && (
            <div className="participating-bet">
              <div className="text">
                <p className="title">Participating bet</p>
                <span className="info">
                  Turning this on will add your bet to the leaderboard. This is
                  toggled by default.
                </span>
              </div>
              <Toggle
                handleToggle={handleParticipantToggle}
                isToggled={participantChecked}
              />
            </div>
          )}
          <div className="decimal">
            <div className="text">
              <p className="title">Decimal odds</p>
              <span className="info">
                Turning this on will show you decimal odds.
              </span>
            </div>
            <Toggle
              handleToggle={handleDecimalToggle}
              isToggled={decimalChecked}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BetControls;

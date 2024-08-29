import React, { useState, useEffect } from "react";
import betslipStore from "../../store/betslipStore";
import Toggle from "../toggle/Toggle";
import "./betcontrols.scss";

type BetControlsProps = {};
const BetControls: React.FC<BetControlsProps> = () => {
  const [parlayChecked, setParlayChecked] = useState(betslipStore.isParlay);
  const [decimalChecked, setDecimalChecked] = useState(
    betslipStore.decimalOdds
  );
  const [participantChecked, setParticipantChecked] = useState(true);

  const betstore = betslipStore;

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

  return (
    <div className="bet-controls">
      <div className="control">
        <div className="parlay">
          <div className="text">
            <p className="title">Parlay</p>
            <span className="info">
              Turning this on will remove individual bets.
            </span>
          </div>
          <Toggle handleToggle={handleParlayToggle} isToggled={parlayChecked} />
        </div>
        <div className="participating-bet">
          <div className="text">
            <p className="title">Participating bet</p>
            <span className="info">
              Turning this on will add your bet to the leaderboard. This is toggled by default.
            </span>
          </div>

          <Toggle
            handleToggle={handleParticipantToggle}
            isToggled={participantChecked}
          />
        </div>
        <div className="decimal">
          <div className="text">
            <p className="title">Decimal odds</p>
            <span className="info">
              Turning this on will you show decimal odds.
            </span>
          </div>
          <Toggle
            handleToggle={handleDecimalToggle}
            isToggled={decimalChecked}
          />
        </div>
       
      </div>
    </div>
  );
};

export default BetControls;

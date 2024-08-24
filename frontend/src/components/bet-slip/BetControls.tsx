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

  return (
    <div className="bet-controls">
      <div className="control">
        <div className="parlay">
          <div className="text">
            <p className="title">Parlay</p>
            <span className="info">
              Turning this on will remove individual bets
            </span>
          </div>
          <Toggle handleToggle={handleParlayToggle} isToggled={parlayChecked} />
        </div>
        <div className="decimal">
          <div className="text">
            <p className="title">Decimal odds</p>
            <span className="info">
              Turning this on will you show decimal odds
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

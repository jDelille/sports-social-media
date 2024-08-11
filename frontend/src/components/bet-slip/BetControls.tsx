import React, { useState, useEffect } from "react";
import betslipStore from "../../store/betslipStore";
import Switch from "react-switch";
import "./betcontrols.scss";
import { COLOR_CONSTANTS } from "../../constants";

type BetControlsProps = {};
const BetControls: React.FC<BetControlsProps> = () => {
  const [checked, setChecked] = useState(betslipStore.isParlay);
  const [decimalChecked, setDecimalChecked] = useState(
    betslipStore.decimalOdds
  );

  const betstore = betslipStore;

  // Effect to update the local state when the store state changes
  useEffect(() => {
    setChecked(betstore.isParlay);
  }, [betstore.isParlay]);

  const handleToggle = (nextChecked: boolean) => {
    setChecked(nextChecked);
    betstore.toggleParlay(); // Update the store state
  };

  const handleDecimalToggle = (nextChecked: boolean) => {
    setDecimalChecked(nextChecked);
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

          <Switch
            onChange={handleToggle}
            checked={checked}
            offColor="#868393"
            onColor={COLOR_CONSTANTS.REPOST_COLOR}
            uncheckedIcon={false}
            checkedIcon={false}
          />
        </div>
        <div className="decimal">
          <div className="text">
            <p className="title">Decimal odds</p>
            <span className="info">
              Turning this on will you show decimal odds
            </span>
          </div>

          <Switch
            onChange={handleDecimalToggle}
            checked={decimalChecked}
            offColor="#868393"
            onColor={COLOR_CONSTANTS.REPOST_COLOR}
            uncheckedIcon={false}
            checkedIcon={false}
          />
        </div>
      </div>
    </div>
  );
};

export default BetControls;

import React, { useState, useEffect } from "react";
import betslipStore from "../../store/betslipStore";
import Switch from "react-switch";
import "./betcontrols.scss";
import { COLOR_CONSTANTS } from "../../constants";

type BetControlsProps = {};
const BetControls: React.FC<BetControlsProps> = () => {
  const [checked, setChecked] = useState(betslipStore.isParlay);

  const betstore = betslipStore;

  // Effect to update the local state when the store state changes
  useEffect(() => {
    setChecked(betstore.isParlay);
  }, [betstore.isParlay]);

  const handleToggle = (nextChecked: boolean) => {
    setChecked(nextChecked);
    betstore.toggleParlay(); // Update the store state
  };

  return (
    <div className="bet-controls">
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
    </div>
  );
};

export default BetControls;
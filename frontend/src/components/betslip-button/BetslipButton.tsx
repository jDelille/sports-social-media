import React from "react";
import "./betslipButton.scss";
import { useBetSlip } from "../../hooks";

type BetslipButtonProps = {};

const BetslipButton: React.FC<BetslipButtonProps> = () => {
  const betSlip = useBetSlip();
  return (
    <div className="wrapper" >
      <button className="betslip-button">
        <span className="selection-number">5</span>
        Selections
      </button>
    </div>
  );
};

export default BetslipButton;

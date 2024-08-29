import React from "react";
import { useBetSlip } from "../../hooks";
import "./betslipButton.scss";

type BetslipButtonProps = {};

const BetslipButton: React.FC<BetslipButtonProps> = () => {
  const betSlip = useBetSlip();

  const handleClick = () => {
    betSlip.onOpen();
  }

  return (
    <div className="wrapper" onClick={handleClick}>
      <button className="betslip-button">
        <span className="selection-number">5</span>
        Selections
      </button>
    </div>
  );
};

export default BetslipButton;

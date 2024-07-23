import React from "react";
import "./betslipButton.scss";

type BetslipButtonProps = {};

const BetslipButton: React.FC<BetslipButtonProps> = () => {
  return (
    <div className="wrapper">
      <button className="betslip-button">
        <span className="selection-number">5</span>
        Selections
      </button>
    </div>
  );
};

export default BetslipButton;

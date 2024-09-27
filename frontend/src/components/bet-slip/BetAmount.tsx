import React, { useEffect, useState } from "react";
import betslipStore from "../../store/betslipStore";
import useParlayPayout from "../../hooks/bet-payout/useParlayPayout";
import useTotalOdds from "../../hooks/bet-payout/useTotalOdds";
import "./betamount.scss";

type BetAmountProps = {
  isDecimal: boolean;
};

const BetAmount: React.FC<BetAmountProps> = ({ isDecimal }) => {
  const [wager, setWager] = useState<number>(0);
  const [payout, setPayout] = useState<number>(0);
  const { calculateParlayPayout } = useParlayPayout();
  const betslip = betslipStore;

  useEffect(() => {
    if (betslip.picks.length > 0 && wager > 0) {
      const decimalOdds: number[] = betslip.picks.map((pick) =>
        parseFloat(pick.decimal_odds)
      );
      const calculatedPayout = calculateParlayPayout(decimalOdds, wager);
      betslip.setPayout(calculatedPayout);
      setPayout(calculatedPayout);
    } else {
      betslip.setPayout(0);
      setPayout(0);
    }
  }, [wager, betslip.picks, calculateParlayPayout]);

  const handleWagerChange = (value: string) => {
    const wagerValue = value === "" ? 0 : parseFloat(value);
    setWager(wagerValue);
    betslip.setWager(wagerValue);
  };

  const decimalOdds = betslip.picks.map((pick) =>
    parseFloat(pick.decimal_odds)
  );
  const totalOdds = useTotalOdds(decimalOdds, !isDecimal);

  return (
    <div className="bet-amount">
      <div className="wager-wrapper">
        <div className="row">
          <p>Total Odds</p>
          <p>{totalOdds}</p>
        </div>
        <div className="row">
          <p>Total payout</p>
          <p>${payout.toFixed(2) || "0.00"}</p>
        </div>
        <div className="row">
          <p>Wager</p>
          <div className="input-wrapper">
            <input
              type="number"
              name="wager"
              placeholder="0.00"
              onChange={(e) => handleWagerChange(e.target.value)}
            />
            <span className="dollar">$</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetAmount;

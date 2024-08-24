import React, { useEffect, useState } from "react";
import betslipStore from "../../store/betslipStore";
import useParlayPayout from "../../hooks/bet-payout/useParlayPayout";
import "./betamount.scss";

const BetAmount: React.FC = () => {
  const [wager, setWager] = useState<number>(0);
  const [payout, setPayout] = useState<number>(0);
  const { calculateParlayPayout } = useParlayPayout();
  const betslip = betslipStore;

  // Calculate payout whenever the wager or picks change
  useEffect(() => {
    if (betslip.picks.length > 0 && wager > 0) {
      const decimalOdds: number[] = betslip.picks.map((pick) =>
        parseFloat(pick.decimal)
      );
      const calculatedPayout = calculateParlayPayout(decimalOdds, wager);
      betslip.setPayout(calculatedPayout); // Save payout to the store
      setPayout(calculatedPayout);
    } else {
      betslip.setPayout(0); // Reset payout in the store
    }
  }, [wager, betslip.picks, calculateParlayPayout]);

  const handleWagerChange = (value: string) => {
    const wagerValue = parseFloat(value);
    setWager(wagerValue);
    betslip.setWager(wagerValue);
  };

  return (
    <div className="bet-amount">
      <div className="wager-wrapper">
        <label htmlFor="wager">Wager</label>
        <input
          type="text"
          name="wager"
          placeholder="$0.00"
          onChange={(e) => handleWagerChange(e.target.value)}
        />
      </div>
      <div className="payout-wrapper">
        <label>Potential winnings</label>
        <p className="payout">${payout.toFixed(2) || "0.00"}</p>
      </div>
    </div>
  );
};

export default BetAmount;

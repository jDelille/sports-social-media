import React, { useState } from "react";
import betslipStore, { Pick } from "../../store/betslipStore";
import { CloseIcon } from "../../icons";
import { observer } from "mobx-react";
import useSinglePayout from "../../hooks/bet-payout/useSinglePayout";

// Separate components for different parts of the BetSlipPick
type BetSlipPickProps = {
  pick: Pick;
};

const BetSlipPick: React.FC<BetSlipPickProps> = ({ pick }) => {
  const betstore = betslipStore;

  const handleRemovePick = (id: string) => {
    betstore.removePick(id);
  };



  return (
    <div className="betslip-pick">
      <BetContent pick={pick} onRemovePick={handleRemovePick} />
    </div>
  );
};

// Component for wager and payout
const BetInput: React.FC<{}> = () => {
  const [payout, setPayout] = useState<number>(0.0);
  return (
    <div className="bet-input-container">

    </div>
  );
};

// Component for the content of the bet
const BetContent: React.FC<{
  pick: Pick;
  onRemovePick: (id: string) => void;
}> = ({ pick, onRemovePick }) => (
  <div className="bet-content">
    <BetInfo pick={pick} />
    <div className="delete-pick" onClick={() => onRemovePick(pick.id)}>
      <CloseIcon size={16} color="#e2434b" />
    </div>
  </div>
);

// Component for displaying bet information
const BetInfo: React.FC<{ pick: Pick }> = observer(({ pick }) => {

  const {calculatePayout} = useSinglePayout();

  const handleWagerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const wager = parseFloat(e.target.value);
    betslipStore.setWager(wager);
  };

  const isParlay = betslipStore.isParlay;
  const wager = betslipStore.wager;
  const payout = calculatePayout(parseFloat(pick.decimal_odds), wager);

  betslipStore.setPayout(payout);

  return (
    <div className="info-wrapper">
      <div className="info">
        <div className="type">
          <p>{pick.bet_type} </p>
          <span className="team">{pick.chosen_team} {pick.handicap}  </span>
          {/* <MatchupInfo teams={pick.teams}  /> */}
          <div className="matchup">
            <p>{pick.home_abbreviation}</p>
            <img src={pick.home_logo} alt="" className="team-logo" />
            <span>-</span>
            <img src={pick.away_logo} alt="" className="team-logo" />
            <p>{pick.away_abbreviation}</p>
          </div>
        </div>
        <div className="price-wrapper">
          {/* <p className="price">
            {betslipStore.decimalOdds
              ? parseFloat(pick.decimal).toFixed(2)
              : pick.price}
          </p> */}
          {!betslipStore.isParlay && (
            <>
              <div className="input-wrapper">
                <div className="symbol">$</div>
                 <input
                  type="number"
                  min="0"
                  step="0.01"
                  onChange={handleWagerChange}
                  placeholder="Enter wager"
                />
              </div>
              <p className="payout">Payout: ${payout.toFixed(2)}</p>
            </>
          )}
        </div>

        {!isParlay && <BetInput />}
      </div>
    </div>
  );
});

export default BetSlipPick;

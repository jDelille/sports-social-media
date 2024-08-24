import React, { useState } from "react";
import betslipStore, { Pick } from "../../store/betslipStore";
import { CloseIcon } from "../../icons";
import { observer } from "mobx-react";

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
  console.log(pick)
  const isParlay = betslipStore.isParlay;
  return (
    <div className="info-wrapper">
      <div className="info">
        <div className="type">
          <p>{pick.type} </p>
          <span className="team">{pick.team} {pick.handicap}  </span>
          <MatchupInfo teams={pick.teams}  />
        </div>
        <div className="price-wrapper">
          <p className="price">
            {betslipStore.decimalOdds
              ? parseFloat(pick.decimal).toFixed(2)
              : pick.price}
          </p>
          {!betslipStore.isParlay && (
            <>
              <div className="input-wrapper">
                <div className="symbol">$</div>
                <input type="text" />
              </div>
              <p className="payout">Payout: $1000</p>
            </>
          )}
        </div>

        {!isParlay && <BetInput />}
      </div>
    </div>
  );
});

// Component for displaying matchup information
const MatchupInfo: React.FC<{ teams: Pick["teams"] }> = ({ teams }) => (
  <div className="matchup">
    <p>{teams.away.abbrv}</p>
    <img src={teams.away.logo} alt="Away Team Logo" className="team-logo" />
    <span>-</span>
    <img src={teams.home.logo} alt="Home Team Logo" className="team-logo" />
    <p>{teams.home.abbrv}</p>
  </div>
);

export default BetSlipPick;

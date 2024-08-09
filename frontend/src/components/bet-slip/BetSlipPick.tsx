import React, { useState } from "react";
import betslipStore, { Pick } from "../../store/betslipStore";
import { CloseIcon } from "../../icons";

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
      <div className="bet-wager">
        <input
          type="number"
          className="wager-input"
          placeholder="0.00"
          onChange={(e) => setPayout(parseInt(e.target.value))}
        />
        <span className="dollar-sign">$</span>
        <label htmlFor="wager-input">Wager</label>
      </div>
      <div className="bet-wager">
        <div className="payout"><span>{payout || '0.00'}</span></div>
        <span className="dollar-sign">$</span>
        <label htmlFor="wager-input">Potential winnings</label>
      </div>
      <div className="bet-payout"></div>
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
const BetInfo: React.FC<{ pick: Pick }> = ({ pick }) => {
  const isParlay = betslipStore.isParlay;
  return (
    <div className="info">
      <div className="text">
        <p className="type">
          {pick.type} {" -"}
          <span className="description">{pick.description}</span>
          <span className="price">{pick.price}</span>
        </p>
        <MatchupInfo teams={pick.teams} />
        {!isParlay && <BetInput />}
      </div>
    </div>
  );
};

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

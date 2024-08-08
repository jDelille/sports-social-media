import React from 'react';
import betslipStore, { Pick } from '../../store/betslipStore';
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

// Component for the content of the bet
const BetContent: React.FC<{ pick: Pick; onRemovePick: (id: string) => void }> = ({ pick, onRemovePick }) => (
  <div className="bet-content">
    <BetInfo pick={pick} />
    <div className="delete-pick" onClick={() => onRemovePick(pick.id)}>
      <CloseIcon size={16} color="#e2434b" />
    </div>
  </div>
);

// Component for displaying bet information
const BetInfo: React.FC<{ pick: Pick }> = ({ pick }) => (
  <div className="info">
    <div className="text">
      <p className="type">
        {pick.type} {" -"}
        <span className="description">{pick.description}</span>
        <span className="price">{pick.price}</span>
      </p>
      <MatchupInfo teams={pick.teams} />
    </div>
  </div>
);

// Component for displaying matchup information
const MatchupInfo: React.FC<{ teams: Pick['teams'] }> = ({ teams }) => (
  <div className="matchup">
    <p>{teams.away.abbrv}</p>
    <img src={teams.away.logo} alt="Away Team Logo" className="team-logo" />
    <span>-</span>
    <img src={teams.home.logo} alt="Home Team Logo" className="team-logo" />
    <p>{teams.home.abbrv}</p>
  </div>
);

export default BetSlipPick;
import React from 'react';
import BovadaMatchTypes from '../../types/BovadaMatch';
import './matchCard.scss';

type MatchCardProps = {
    match: BovadaMatchTypes;
    onClick: (match: BovadaMatchTypes) => void;
 }


const MatchCard: React.FC<MatchCardProps> = ({match, onClick}) => {
  return (
    <div className="match-card" onClick={() => onClick(match)}>
      <p>{match.description}</p>
    </div>
  );
};

export default MatchCard;
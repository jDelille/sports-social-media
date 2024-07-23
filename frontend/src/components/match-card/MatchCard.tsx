import React from "react";
import BovadaMatchTypes from "../../types/BovadaMatch";
import moment from 'moment';
import "./matchCard.scss";

type MatchCardProps = {
  match: BovadaMatchTypes;
  onClick: (match: BovadaMatchTypes) => void;
};

const MatchCard: React.FC<MatchCardProps> = ({ match, onClick }) => {
  const homeTeam = match.espnMatch?.competitions[0].competitors[0];
  const awayTeam = match.espnMatch?.competitions[0].competitors[1];

  const status = match.espnMatch?.status;

  // make into reusable hook
  const dateString = status?.type.shortDetail;
  const timePart = dateString?.split(' - ')[1]?.split(' ')[0] + ' ' + dateString?.split(' - ')[1]?.split(' ')[1];
  const formattedTime = moment(timePart, 'h:mm A').format('h:mm A');

  if(!match) {
    return null;
  }

  return (
    <div className="match-card" onClick={() => onClick(match)}>
      <div className="teams">
        <div className="home">
          <img src={homeTeam?.team.logo} alt="" className="team-logo" />
          <p className="name">
            {homeTeam?.team.shortDisplayName}{" "}
            <span className="record">{homeTeam?.records[0].summary}</span>
          </p>
        </div>
        <div className="away">
          <img src={awayTeam?.team.logo} alt="" className="team-logo" />
          <p className="name">
            {awayTeam?.team.shortDisplayName}{" "}
            <span className="record">{awayTeam?.records[0].summary}</span>
          </p>
        </div>
      </div>
      <div className="data">
        {status?.type.state === "pre" ? (
          <p className="time">{formattedTime}</p>
        ): (
         <>
          <p>{homeTeam?.score}</p>
          <p>{awayTeam?.score}</p>
         </>
        )}
    
      </div>
    </div>
  );
};

export default MatchCard;

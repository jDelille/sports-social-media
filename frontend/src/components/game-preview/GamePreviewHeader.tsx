import React from "react";
import { GameTypes } from "../../types/GameTypes";
import "./gamePreviewHeader.scss";

type GamePreviewHeaderProps = {
  game: GameTypes | undefined;
};

const GamePreviewHeader: React.FC<GamePreviewHeaderProps> = ({ game }) => {
  const awayTeam = game?.boxscore.teams[0].team;
  const homeTeam = game?.boxscore.teams[1].team;

  return (
    <div className="game-preview-header">
      <div className="teams">
        <div className="team">
        <img src={awayTeam?.logo} alt="" />
          <p>{awayTeam?.displayName}</p>

        </div>
        <p>@</p>
        <div className="team">
          <img src={homeTeam?.logo} alt="" />
          <p>{homeTeam?.displayName}</p>
        </div>
      </div>
    </div>
  );
};

export default GamePreviewHeader;

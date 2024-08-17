import React from "react";
import "./gamePreviewHeader.scss";
import Linescores from "./linescores/Linescores";

type GamePreviewHeaderProps = {
  game: any | undefined;
};

const GamePreviewHeader: React.FC<GamePreviewHeaderProps> = ({ game }) => {
  const awayTeam = game?.boxscore.teams[0].team;
  const homeTeam = game?.boxscore.teams[1].team;

  const status = game?.header.competitions[0].status;

  const isLive = status?.type.description === "In Progress";
  const isFinal = status?.type.completed;

  const homeLinescores = game?.header.competitions[0].competitors[0].linescores;
  const awayLinescores = game?.header.competitions[0].competitors[1].linescores;

  return (
    <div className="game-preview-header">
      <div className="content">
        <div className="team-content">
          <div className="teams">
            <div className="team">
              <div
                className="color"
                style={{ background: `#${homeTeam?.color}` }}
              ></div>
              <img src={homeTeam?.logo} alt="" />
              <p className="display-name">{homeTeam?.displayName}</p>
            </div>
            <div className="team">
              <div
                className="color"
                style={{ background: `#${awayTeam?.color}` }}
              ></div>
              <img src={awayTeam?.logo} alt="" />
              <p className="display-name">{awayTeam?.displayName}</p>
            </div>
          </div>
          <Linescores homeScores={homeLinescores} awayScores={awayLinescores} />
        </div>

        <div className="status">
          {isLive && <div className="live">LIVE</div>}
          {isFinal && <div className="final">FINAL</div>}
          {!isFinal && (
            <p>
              {status?.periodPrefix} {status?.period}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GamePreviewHeader;

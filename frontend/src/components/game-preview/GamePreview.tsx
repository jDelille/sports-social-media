import React, { useEffect, useState } from "react";
import { CloseIcon } from "../../icons";
import { COLOR_CONSTANTS } from "../../constants";
import { useAxios, useGamePreview } from "../../hooks";
import GamePreviewHeader from "./GamePreviewHeader";
import BoxScore from "./box-score/BoxScore";
import CategorySelector from "./category-selector/CategorySelector";
import "./gamePreview.scss";

type GamePreviewProps = {};

const GamePreview: React.FC<GamePreviewProps> = () => {
  const [loading, setLoading] = useState(false);
  const [game, setGame] = useState<any>();

  const gamePreview = useGamePreview();
  const { isOpen, onClose } = gamePreview;

  const league = gamePreview.league;
  const gameId = gamePreview.gameId;

  const fetchGameData = async () => {
    setLoading(true);
    try {
      const espnResponse = await useAxios.get(`/espn/game/${league}/${gameId}`);
      setGame(espnResponse.data.gamepackageJSON);
    } catch (error) {
      console.error("Error fetching game data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchGameData();
    }
  }, [isOpen, league, gameId]);

  if (!isOpen) {
    return null;
  }

  const homeTeam = game?.boxscore.teams[1].team;
  const awayTeam = game?.boxscore.teams[0].team;

  return (
    <div className="overlay">
      <div className="game-preview">
        <div className="game-header">
          <div className="close" onClick={onClose}>
            <CloseIcon size={22} color={COLOR_CONSTANTS.LIGHTGRAY} />
          </div>
          <GamePreviewHeader game={game} />
        </div>
        {/* <CategorySelector homeTeam={homeTeam} awayTeam={awayTeam} /> */}
        <div className="game-info">
          {/* <BoxScore boxscore={game?.boxscore} /> */}
          <h3>Feature coming soon.</h3>
        </div>
      </div>
    </div>
  );
};

export default GamePreview;

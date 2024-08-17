import React, { useEffect, useState } from "react";
import { CloseIcon } from "../../icons";
import { COLOR_CONSTANTS } from "../../constants";
import { useAxios, useGamePreview } from "../../hooks";
import "./gamePreview.scss";
import { GameTypes } from "../../types/GameTypes";
import GamePreviewHeader from "./GamePreviewHeader";

type GamePreviewProps = {};

const GamePreview: React.FC<GamePreviewProps> = () => {
  const [loading, setLoading] = useState(false);
  const [game, setGame] = useState<GameTypes>();

  // Custom hooks should be called at the top level
  const gamePreview = useGamePreview();
  const { isOpen, onClose } = gamePreview;

 const league = gamePreview.league;
 const gameId = gamePreview.gameId;

 console.log('League:', league, 'Game ID:', gameId);


  const fetchGameData = async () => {
    setLoading(true);
    try {
      const espnResponse = await useAxios.get(`/espn/game/${league}/${gameId}`); // Use axios directly here
      setGame(espnResponse.data.gamepackageJSON);
    } catch (error) {
      console.error("Error fetching game data:", error);
    } finally {
      setLoading(false);
    }
  };

  const boxScore = game?.boxscore

  console.log(game)

  useEffect(() => {
    if (isOpen) {
      fetchGameData();
    }
  }, [isOpen, league, gameId]); // Add dependencies that affect the data fetching

  if (!isOpen) {
    return null;
  }

  return (
    <div className="overlay">
      <div className="game-preview">
        <div className="game-header">
          <div className="close" onClick={onClose}>
            <CloseIcon size={22} color={COLOR_CONSTANTS.LIGHTGRAY} />
          </div>
          <GamePreviewHeader game={game} />
        </div>
        <div className="game-info">
          {/* Render game data here */}
        </div>
      </div>
    </div>
  );
};

export default GamePreview;
import React from 'react';
import { CloseIcon } from '../../icons';
import { COLOR_CONSTANTS } from '../../constants';
import { useGamePreview } from '../../hooks';
import './gamePreview.scss';

type GamePreviewProps = {
 
 }
const GamePreview: React.FC<GamePreviewProps> = () => {
    const gamePreview = useGamePreview();

    const onClose = () => {
        gamePreview.onClose();
    }

    if(!gamePreview.isOpen) {
        return null;
    }

  return (
    <div className="overlay">
      <div className="game-preview">
        <div className="game-header">
        <div className="close" onClick={onClose}>
                <CloseIcon size={22} color={COLOR_CONSTANTS.LIGHTGRAY} />
            </div>
        </div>
        <div className="game-info"></div>
      </div>
    </div>
  );
};

export default GamePreview;
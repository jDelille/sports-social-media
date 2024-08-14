import React, { useState } from 'react';
import Popup from './Popup';
import useLeaderboardInfoPopup from '../../hooks/popups/useLeaderboardInfoPopup';
import { useNavigate } from 'react-router-dom';
import './leaderboardInfo.scss';

type LeaderboardInfoProps = {};

const LeaderboardInfo: React.FC<LeaderboardInfoProps> = () => {
    const leaderboardInfo = useLeaderboardInfoPopup();
    const [dontShowAgain, setDontShowAgain] = useState(false);
    const navigate = useNavigate();

    const closePopup = () => {
        leaderboardInfo.onClose();
        
        // Logic to update user object and store preference
        if (dontShowAgain) {
            // Update user object to indicate they are not participants
            // Save the preference not to show this popup again
          


        }
    };

    const handleSelect = () => {
        setDontShowAgain(!dontShowAgain);
        closePopup();
    }

    const redirectToSportbook = () => {
        closePopup();
        navigate('/leaderboard')
    }

    const bodyContent = (
        <div className="popup-content">
            <h1>Leaderboard</h1>
            <p className='description'>
                Ready to make your mark? The leaderboard is your chance to show off your betting skills. Jump in whenever you like—no pressure. Enter your picks, and if you’re feeling confident, throw down a wager to up the stakes. It’s all about fun, but with the right moves, you could rise to the top!
            </p>
           
            <button className="cta-button" onClick={redirectToSportbook}>I’m In!</button>
            <button className="secondary-button" onClick={closePopup}>Maybe Later</button>
            <label>
                <input 
                    type="checkbox" 
                    checked={dontShowAgain} 
                    onChange={handleSelect} 
                />
                Don’t show this again and close
            </label>
        </div>
    );

    return (
        <Popup 
            body={bodyContent}
            isOpen={leaderboardInfo.isOpen}
            onClose={leaderboardInfo.onClose}
            hideHeader
        />
    );
};

export default LeaderboardInfo;
import React, { useContext, useState } from 'react';
import Popup from './Popup';
import useLeaderboardInfoPopup from '../../hooks/popups/useLeaderboardInfoPopup';
import { useNavigate } from 'react-router-dom';
import './leaderboardInfo.scss';
import { AuthContext } from '../../context/AuthContext';
import { useAxios } from '../../hooks';

type LeaderboardInfoProps = {};

const LeaderboardInfo: React.FC<LeaderboardInfoProps> = () => {
    const leaderboardInfo = useLeaderboardInfoPopup();
    const [dontShowAgain, setDontShowAgain] = useState(false);
    const navigate = useNavigate();

    const {currentUser} = useContext(AuthContext) || {};

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

    const redirectToSportbook = async () => {
        closePopup();
       
        
        try {
            const newUser = {
                userId: currentUser.id,
                wins: 0,
                losses: 0,
                amount_wagered: 0,
                amount_won: 0,
                average_odds: 0
            }

            await useAxios.post(`/leaderboard/add/${currentUser.id}`, newUser);
        } catch (error) {
            console.error("Failed to add user to leaderboard.", error)
        }

        navigate('/leaderboard')


    }

    const bodyContent = (
        <div className="popup-content">
            <h1>Leaderboard</h1>
            <p className='description'>
                Ready to make your mark? The leaderboard is your chance to show off your betting skills. Jump in whenever you like—no pressure. Enter your picks, and if you’re feeling confident, throw down a wager to up the stakes. It’s all about fun, but with the right moves, you could rise to the top!
            </p>

            <p>Currently, the leaderboard only tracks moneyline, spread, and total bets. Don't worry, more tracked bets will be added in the future!</p>
           
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
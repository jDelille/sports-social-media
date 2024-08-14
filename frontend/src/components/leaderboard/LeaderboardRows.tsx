import React from 'react';
import './leaderboardRows.scss';

type LeaderboardRowsProps = {
 
 }
const LeaderboardRows: React.FC<LeaderboardRowsProps> = () => {
  return (
    <div className="leaderboard-rows">
        <div className="labels">
            <div className="place">#</div>
            <div className="player">Player</div>
            <div className="stats">
            <div className="wins">W</div>
            <div className="loss">L</div>
            <div className="wagered">Wagered</div>
            <div className="profit">Profit</div>
            <div className="odds">Avg Odds</div>
            </div>
        </div>
    <div className="row">
        <div className="place">1</div>
        <p className='player'>Jdeli</p>
        <div className="stats">
        <p className='wins'>23</p>
        <p className='loss'>2</p>
        <p className='wagered'>$1.3k</p>
        <p className='profit'>$10,700</p>
        <div className="odds">+320</div>
        </div>
    </div>
    <div className="row">
    <div className="place">1</div>
        <p className='player'>Jdeli</p>
        <div className="stats">
        <p className='wins'>23</p>
        <p className='loss'>2</p>
        <p className='wagered'>$1.3k</p>
        <p className='profit'>$9500</p>
        <div className="odds">+320</div>

        </div>
    </div>
    <div className="row">
    <div className="place">1</div>
        <p className='player'>Jdeli</p>
        <div className="stats">
        <p className='wins'>23</p>
        <p className='loss'>2</p>
        <p className='wagered'>$1.3k</p>
        <p className='profit'>$1700</p>
        <div className="odds">+320</div>

        </div>
    </div>
    <div className="row">
    <div className="place">1</div>
        <p className='player'>Jdeli</p>
        <div className="stats">
        <p className='wins'>23</p>
        <p className='loss'>2</p>
        <p className='wagered'>$1.3k</p>
        <p className='profit'>$1000</p>
        <div className="odds">+320</div>

        </div>
    </div>

    </div>
  );
};

export default LeaderboardRows;
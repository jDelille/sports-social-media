import React from "react";
import "./sportPicker.scss";

type Sport = {
  sport: string;
  league: string;
};

type SportPickerProps = {
  onSportSelect: (sport: Sport) => void; 
};

const sports: Sport[] = [
    { sport: 'hockey', league: 'nhl' },
    // { sport: 'basketball', league: 'nba' },
    { sport: 'football', league: 'nfl' },
    { sport: 'baseball', league: 'mlb' },
    // Add more sports as needed
  ];

  const SportPicker: React.FC<SportPickerProps> = ({ onSportSelect }) => {
    return (
      <div className="sport-picker">
        {sports.map((sport) => (
          <button key={`${sport.sport}-${sport.league}`} onClick={() => onSportSelect(sport)}>
            {/* <img src={`${sport.league}.png`} /> */}
            {sport.league.toUpperCase()}
          </button>
        ))}
      </div>
    );
  };

export default SportPicker;

import React, { useEffect, useState } from "react";
import PageHeader from "../components/page-header/PageHeader";
import { useAxios } from "../hooks";
import BovadaMatchTypes from "../types/BovadaMatch";
import { useNavigate } from "react-router-dom";
import matchStore from "../store/matchStore";
import "./page.scss";
import SportPicker from "../components/sport-picker/SportPicker";

type Sport = {
  sport: string;
  league: string;
};

type MatchesProps = {};
const Matches: React.FC<MatchesProps> = () => {
  const [sport, setSport] = useState('baseball');
  const [league, setLeague] = useState('mlb')

  const [matches, setMatches] = useState<BovadaMatchTypes[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOdds = async () => {
      try {
        const response = await useAxios.get(`/odds/${sport}/${league}`);
        const data = await response.data;
        console.log(data);
        setMatches(data);
      } catch (error) {
        console.error("Error fetching odds:", error);
      }
    };
    fetchOdds();
  }, [sport, league]);

  const handleMatchClick = (match: BovadaMatchTypes) => {
    matchStore.setMatch(match);
    navigate(`/match`);
  };

  console.log(matches);

  const handleChooseSport = (selectedSport: Sport) => {
    setSport(selectedSport.sport)
    setLeague(selectedSport.league)
  }

  return (
    <div className="page matches-page">
      <PageHeader title="Matches" />
      <SportPicker onSportSelect={handleChooseSport}/>

      {matches.map((match) => (
        <div
          key={match.id}
          className="match-box"
          onClick={() => handleMatchClick(match)}
        >
          {match.description}
        </div>
      ))}
    </div>
  );
};

export default Matches;

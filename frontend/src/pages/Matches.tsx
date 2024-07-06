import React, { useEffect, useState } from "react";
import PageHeader from "../components/page-header/PageHeader";
import { useAxios } from "../hooks";
import BovadaMatchTypes from "../types/BovadaMatch";
import { useNavigate } from "react-router-dom";
import matchStore from "../store/matchStore";
import "./page.scss";
import SportPicker from "../components/sport-picker/SportPicker";
import MatchCard from "../components/match-card/MatchCard";

type Sport = {
  sport: string;
  league: string;
};

type MatchesProps = {};
const Matches: React.FC<MatchesProps> = () => {
  const [sport, setSport] = useState('baseball');
  const [league, setLeague] = useState('mlb')
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState<BovadaMatchTypes[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOdds = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const bovadaResponse = await useAxios.get(`/odds/${sport}/${league}`);
        const espnResponse = await useAxios.get(`/espn/${sport}/${league}`);
        const bovadaData = await bovadaResponse.data;
        const espnData = await espnResponse.data.events;
        const combinedData = { bovada: bovadaData, espn: espnData };
        console.log(combinedData);
        setMatches(bovadaData);
      } catch (error) {
        console.error("Error fetching odds:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
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

      <div className="matches-content">
      {loading ? (
        <div className="loading-indicator">Loading...</div>
      ) : (
        matches.map((match) => (
          <MatchCard match={match} onClick={handleMatchClick} key={match.id} />
        ))
      )}
      </div>

      
    </div>
  );
};

export default Matches;

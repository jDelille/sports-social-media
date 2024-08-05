import React, { useEffect, useState } from "react";
import PageHeader from "../components/page-header/PageHeader";
import { useAxios } from "../hooks";
import BovadaMatchTypes from "../types/BovadaMatch";
import { useNavigate } from "react-router-dom";
import matchStore from "../store/matchStore";
import SportPicker from "../components/sport-picker/SportPicker";
import MatchCard from "../components/match-card/MatchCard";
import "./page.scss";

type Sport = {
  sport: string;
  league: string;
};

type MatchesProps = {};
const Matches: React.FC<MatchesProps> = () => {
  const [sport, setSport] = useState("baseball");
  const [league, setLeague] = useState("mlb");
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState<BovadaMatchTypes[]>([]);
  const navigate = useNavigate();

  const combineData = (bovadaData: any[], espnData: any[]) => {
    return bovadaData.map((bovadaMatch) => {
      const espnMatch = espnData.find(
        (espnMatch) =>
          espnMatch.name
            .toLowerCase()
            .includes(bovadaMatch.description.toLowerCase().split(" @ ")[0]) &&
          espnMatch.name
            .toLowerCase()
            .includes(bovadaMatch.description.toLowerCase().split(" @ ")[1])
      );
      return { ...bovadaMatch, espnMatch };
    });
  };

  useEffect(() => {
    const fetchOdds = async () => {
      setLoading(true);
      try {
        const bovadaResponse = await useAxios.get(`/odds/${sport}/${league}`);
        const espnResponse = await useAxios.get(`/espn/${sport}/${league}`);
        const bovadaData = bovadaResponse.data;
        const espnData = espnResponse.data.events;
        const combinedData = combineData(bovadaData, espnData);
        setMatches(combinedData);
        console.log(combinedData)
      } catch (error) {
        console.error("Error fetching odds:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOdds();
  }, [sport, league]);

  const handleMatchClick = (match: BovadaMatchTypes) => {
    matchStore.setMatch(match);
    navigate(`/match`);
  };

  const handleChooseSport = (selectedSport: Sport) => {
    setSport(selectedSport.sport);
    setLeague(selectedSport.league);
  };

  return (
    <div className="page matches-page">
      <PageHeader title="Matches" />
      <SportPicker onSportSelect={handleChooseSport} />

      <div className="matches-content">
        {loading ? (
          <div className="loading-indicator">Loading...</div>
        ) : (
          matches.map((match) => {
            if (match.espnMatch) {
              return (
                <MatchCard
                  match={match}
                  onClick={handleMatchClick}
                  key={match.id}
                />
              );
            }
          })
        )}
      </div>
    </div>
  );
};

export default Matches;

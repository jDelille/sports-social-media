import React, { useEffect, useState } from "react";
import PageHeader from "../components/page-header/PageHeader";
import { useAxios } from "../hooks";
import BovadaMatchTypes from "../types/BovadaMatch";
import { useNavigate } from "react-router-dom";
import matchStore from "../store/matchStore";
import MatchCategories from "../components/match-categories/MatchCategories";
import "./page.scss";

type MatchesProps = {};
const Matches: React.FC<MatchesProps> = () => {
  const [matches, setMatches] = useState<BovadaMatchTypes[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOdds = async () => {
      try {
        const response = await useAxios.get(`/odds/`);
        const data = await response.data;
        console.log(data);
        setMatches(data);
      } catch (error) {
        console.error("Error fetching odds:", error);
      }
    };
    fetchOdds();
  }, []);

  const handleMatchClick = (match: BovadaMatchTypes) => {
    matchStore.setMatch(match);
    navigate(`/match`);
  };

console.log(matches)

  return (
    <div className="page matches-page">
      <PageHeader title="Matches" />
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

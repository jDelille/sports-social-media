import React, { useState } from "react";
import matchStore from "../store/matchStore";
import MatchCategories from "../components/match-categories/MatchCategories";
import { PageHeader } from "../components";
import MatchHeader from "../components/match-header/MatchHeader";
import BetslipButton from "../components/betslip-button/BetslipButton";
import MarketFeed from "../components/market-feed/MarketFeed";
import "./page.scss";
import "./matchPage.scss";

type MatchProps = {};

const Match: React.FC<MatchProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState("Game Lines");

  const match = matchStore.match;
  const displayGroups = match?.displayGroups;

  const teams = {
    home: {
      logo: match?.espnMatch.competitions[0].competitors[0].team.logo,
      abbrv: match?.espnMatch.competitions[0].competitors[0].team.abbreviation,
    },
    away: {
      logo: match?.espnMatch.competitions[0].competitors[1].team.logo,
      abbrv: match?.espnMatch.competitions[0].competitors[1].team.abbreviation,
    },
  };

  return (
    <div className="page match-page">
      <PageHeader title={match?.espnMatch.shortName as string} hasBack />

      <MatchHeader match={match} />

      <MatchCategories
        displayGroups={displayGroups}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />

      <MarketFeed
        displayGroups={displayGroups}
        selectedCategory={selectedCategory}
        teams={teams}
        eventId={match?.espnMatch.id}
      />

      <BetslipButton />
    </div>
  );
};

export default Match;

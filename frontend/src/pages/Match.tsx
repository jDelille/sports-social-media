import React, { useState } from "react";
import matchStore from "../store/matchStore";
import { useBetSlip } from "../hooks";
import MatchCategories from "../components/match-categories/MatchCategories";
import { PageHeader } from "../components";
import MatchHeader from "../components/match-header/MatchHeader";
import "./page.scss";
import "./matchPage.scss";
import BetslipButton from "../components/betslip-button/BetslipButton";
import MarketFeed from "../components/market-feed/MarketFeed";

type MatchProps = {};

const Match: React.FC<MatchProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState("Game Props");

  const match = matchStore.match;
  const displayGroups = match?.displayGroups;
  const betSlip = useBetSlip();

  const handleClick = (description: string, price: string, type: string) => {
    const bet = {
      description,
      price,
      type
    };

    betSlip.onOpen(bet);
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
        handleClick={handleClick}
      />

      <BetslipButton />
    </div>
  );
};

export default Match;

{
  /* <div
            className="outcomes"
            onClick={() =>
              handleClick(
                group?.markets[2]?.outcomes[0].description,
                group.markets[2].outcomes[0].price.american
              )
            }
          >
            <p>{group.markets[2].outcomes[0].description}</p>
            <p>{group.markets[2].outcomes[0].price.american}</p>
          </div> */
}

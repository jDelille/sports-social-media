import React, { useState } from "react";
import matchStore from "../store/matchStore";
import { useBetSlip } from "../hooks";
import MatchCategories from "../components/match-categories/MatchCategories";
import "./page.scss";

type MatchProps = {};

const Match: React.FC<MatchProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState("Game Lines");

  const match = matchStore.match;
  const displayGroups = match?.displayGroups;
  const betSlip = useBetSlip();

  const handleClick = (description: string, price: string) => {
    const bet = {
      description,
      price,
    };

    betSlip.onOpen(bet);
  };

  console.log(displayGroups);

  return (
    <div className="page">
      <p>{match?.description}</p>

      <MatchCategories displayGroups={displayGroups} />

      {displayGroups?.map((group, index) => {
        if(selectedCategory === group?.description) {
          return (
            <div>
              <p>{group?.description}</p>
  
              {group.markets.map((market) =>
                market.outcomes.map((outcome) => (
                  <p className="outcome">{outcome.description}</p>
                ))
              )}
            </div>
          );
        }
        
      })}
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

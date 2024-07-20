import React, { useState } from "react";
import matchStore from "../store/matchStore";
import { useBetSlip } from "../hooks";
import MatchCategories from "../components/match-categories/MatchCategories";
import "./page.scss";
import "./matchPage.scss";

type MatchProps = {};

const Match: React.FC<MatchProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState("Player Props");

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
    <div className="page match-page">
      <p>{match?.description}</p>

      <MatchCategories displayGroups={displayGroups} />

      {displayGroups?.map((group, index) => {
        if (selectedCategory === group?.description) {
          return (
            <div key={index} >
              <p className="group-description">{group?.description}</p>
              <div className="markets">
                {group.markets.map((market) => (
                  <div className="market">
                    <div key={market.description} >
                      <p className="description">{market.description}</p>
                      <div className="market1">
                      {market.outcomes.map((outcome) => (
                        <p className="outcome" key={outcome.description}>
                          {outcome.description} {outcome.price.handicap} {outcome.price.american}
                        </p>
                      ))}
                      </div>
                     
                    </div>
                  </div>
                ))}
              </div>
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

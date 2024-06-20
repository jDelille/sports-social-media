import React from "react";
import matchStore from "../store/matchStore";
import { useBetSlip } from "../hooks";
import "./page.scss";
import { Price } from "../types/BovadaMatch";
import MatchCategories from "../components/match-categories/MatchCategories";

type MatchProps = {};

const Match: React.FC<MatchProps> = () => {
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

  return (
    <div className="page">
            <p>{match?.description}</p>

      <MatchCategories displayGroups={displayGroups}/>


      {displayGroups?.map((group, index) => {
        if (index === 0) {
          return (
            <div>
              <p>{group.description}</p>
              <p>{group.markets[2].description}</p>

              <div
                className="outcomes"
                onClick={() =>
                  handleClick(
                    group.markets[2].outcomes[0].description,
                    group.markets[2].outcomes[0].price.american
                  )
                }
              >
                <p>{group.markets[2].outcomes[0].description}</p>
                <p>{group.markets[2].outcomes[0].price.american}</p>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Match;

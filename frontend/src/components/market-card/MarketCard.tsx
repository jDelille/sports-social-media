import React, { useState } from "react";
import { ChevronDownIcon } from "../../icons";
import { useBetSlip } from "../../hooks";
import betslipStore, { Pick, Picks } from "../../store/betslipStore";
import "./marketCard.scss";
import { Teams } from "../market-feed/MarketFeed";

/**
 * Make market types
 */

type MarketCardProps = {
  market: any;
  handleClick: (description: string, price: string, type: string, matchup: string) => void;
  matchup: string
  teams: Teams;
};

const MarketCard: React.FC<MarketCardProps> = ({ market, handleClick, matchup, teams}) => {
    const [hasClickedMarket, setHasClickedMarket] = useState(false);
    const betslip = useBetSlip();
    const betstore = betslipStore;

    const handleOutcomeClick = (bet: Pick) => {
      betstore.addPick(bet)
      betslip.onOpen()
    }

  return (
    <div className="market-card" onClick={() => setHasClickedMarket(!hasClickedMarket)}>
      <div key={market.description} className="market-info">
        <p className="description">
          {market.description} <span>- {market.period.description}</span>
          <ChevronDownIcon size={20} color="black" />
        </p>
        
        {hasClickedMarket && (
          <div className="market1" >
            {market.outcomes.map((outcome: any) => (
              <p className="outcome" key={outcome.description} onClick={() => handleOutcomeClick({
                id: `${outcome.description} ${market.description}`,
                type: outcome.description, 
                price: outcome.price.american,
                description: market.description,
                matchup: matchup,
                teams: teams
              })}>
                {outcome.description} 
                <span className="handicap">{outcome.price.handicap}</span>
                <span className="price">{outcome.price.american}</span>
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketCard;

import React, { useState } from "react";
import { ChevronDownIcon } from "../../icons";
import "./marketCard.scss";

/**
 * Make market types
 */

type MarketCardProps = {
  market: any;
  handleClick: (description: string, price: string, type: string) => void;
};

const MarketCard: React.FC<MarketCardProps> = ({ market, handleClick }) => {
    const [hasClickedMarket, setHasClickedMarket] = useState(false);

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
              <p className="outcome" key={outcome.description} onClick={() => handleClick(outcome.description, outcome.price.american, market.description)}>
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

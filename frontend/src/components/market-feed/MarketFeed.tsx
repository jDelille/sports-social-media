import React from 'react';
import { DisplayGroup } from '../../types/BovadaMatch';
import MarketCard from '../market-card/MarketCard';

type MarketFeedProps = {
    displayGroups: DisplayGroup[] | undefined;
    selectedCategory: string;
    handleClick: (description: string, price: string, type: string, matchup: string) => void;
    matchup: string;
 }
const MarketFeed: React.FC<MarketFeedProps> = ({displayGroups, selectedCategory, handleClick, matchup}) => {
    if(!displayGroups) {
        return null;
    }

  return (
    <div className="market-feed">
      {displayGroups.map((group, index) => {
        if (selectedCategory === group.description) {
          
          return (
            <div key={index} >
              <div className="markets">
                {group.markets.map((market) => (
                  <MarketCard market={market} handleClick={handleClick} matchup={matchup}/>
                ))}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default MarketFeed;
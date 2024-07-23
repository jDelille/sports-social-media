import React from 'react';
import { DisplayGroup } from '../../types/BovadaMatch';
import MarketCard from '../market-card/MarketCard';

type MarketFeedProps = {
    displayGroups: DisplayGroup[] | undefined;
    selectedCategory: string;
 }
const MarketFeed: React.FC<MarketFeedProps> = ({displayGroups, selectedCategory}) => {
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
                  <MarketCard market={market}/>
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
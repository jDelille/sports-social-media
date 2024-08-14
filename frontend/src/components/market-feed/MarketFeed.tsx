import React from "react";
import { DisplayGroup } from "../../types/BovadaMatch";
import MarketCard from "../market-card/MarketCard";

export type Teams = {
  home: {
    logo: string | undefined;
    abbrv: string | undefined;
  };
  away: {
    logo: string | undefined;
    abbrv: string | undefined;
  };
};

type MarketFeedProps = {
  displayGroups: DisplayGroup[] | undefined;
  selectedCategory: string;
  matchup: string;
  teams: Teams;
  eventId: string | undefined;
};
const MarketFeed: React.FC<MarketFeedProps> = ({
  displayGroups,
  selectedCategory,
  matchup,
  teams,
  eventId,
}) => {
  if (!displayGroups) {
    return null;
  }

  return (
    <div className="market-feed">
      {displayGroups.map((group, index) => {
        if (selectedCategory === group.description) {
          return (
            <div key={index}>
              <div className="markets">
                {group.markets.map((market) => (
                  <MarketCard
                    market={market}
                    matchup={matchup}
                    teams={teams}
                    eventId={eventId}
                  />
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

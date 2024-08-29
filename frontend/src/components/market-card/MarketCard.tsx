import React, { useState } from "react";
import { ChevronDownIcon } from "../../icons";
import { useBetSlip } from "../../hooks";
import betslipStore, { Pick, Picks } from "../../store/betslipStore";
import { Teams } from "../market-feed/MarketFeed";
import "./marketCard.scss";
import { useParams } from "react-router-dom";

/**
 * Make market types
 */

type MarketCardProps = {
  market: any;
  teams: Teams;
  eventId: string | undefined;
};

const MarketCard: React.FC<MarketCardProps> = ({ market, teams, eventId }) => {
  const [hasClickedMarket, setHasClickedMarket] = useState(false);
  const betslip = useBetSlip();
  const betstore = betslipStore;

  const { sport, league } = useParams();

  const handleOutcomeClick = (bet: Pick) => {
    betstore.addPick(bet);
    betslip.onOpen();
  };

  return (
    <div
      className="market-card"
      onClick={() => setHasClickedMarket(!hasClickedMarket)}
    >
      <div key={market.description} className="market-info">
        <p className="description">
          {market.description} <span>- {market.period.description}</span>
          <ChevronDownIcon size={20} color="black" />
        </p>

        {hasClickedMarket && (
          <div className="market1">
            {market.outcomes.map((outcome: any) => {
              console.log("outcome", outcome);
              console.log("market", market);
              return (
                <p
                  className="outcome"
                  key={outcome.description}
                  onClick={() =>
                    handleOutcomeClick({
                      id: `${outcome.description} ${market.description}`,
                      bet_type: market.description,
                      handicap:
                        market.description === "Runline" ||
                        market.description === "Point Spread" ||
                        market.description === "Total"
                          ? outcome.price.handicap
                          : null,
                      sport: sport as string,
                      league: league as string,
                      home_abbreviation: teams.home.abbrv as string,
                      home_logo: teams.home.logo as string,
                      away_abbreviation: teams.away.abbrv as string,
                      away_logo: teams.away.logo as string,
                      chosen_team: outcome.description,
                      event_id: eventId as string,
                      decimal_odds: '2.0',
                      status: 'pending',
                      wager: betstore.wager,
                      payout: betstore.payout,
                      price: outcome.price.american,
                      is_winner: false,
                      is_boosted: 0
                    })
                  }
                >
                  {outcome.description}
                  <span className="handicap">{outcome.price.handicap}</span>
                  <span className="price">{outcome.price.american}</span>
                </p>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketCard;

import React from "react";
import PostTypes from "../../types/Post";
import useMoneylineCheck from "../../hooks/bet-check/useMoneylineCheck";

type BetProps = {
  post: PostTypes;
};

const Bet: React.FC<BetProps> = ({ post }) => {
  if (!post.bet) {
    return null;
  }

  const hasWager = parseInt(post.bet.wager) > 0;

  return (
    <div className={hasWager ? "wagered-bet" : "bet"}>
      {post.bet.picks?.map((pick, index) => {
        const { eventId, type, teams, price, description, id, sport, league } =
          pick;

        const { status, loading, error } = useMoneylineCheck({
          sport,
          league,
          eventId,
          type
        });

        return (
          <div className="pick" id={pick.id}>
            <p className="description">
              {pick.type} <p>&#8226;</p> <span>{pick.description}</span>
            </p>

            <div className="matchup">
              <div className="team">
                <p>{pick.teams.away.abbrv}</p>
                <img src={pick.teams.away.logo} alt="Away team logo" />
              </div>

              <div className="team">
                <img src={pick.teams.home.logo} alt="Home team logo" />
                <p>{pick.teams.home.abbrv}</p>
              </div>
            </div>

            <p className="price">{pick.price}</p>
            {/* Display status, loading, or error for each pick */}
            {/* 
            {error && <p>Error: {error}</p>}
            {status && <p>Status: {status}</p>} */}
            {<p>Status: {status ? "Win" : "Loss"}</p>}
            
          </div>
        );
      })}
      {hasWager && (
        <div className="payout">
          <p>Wagered ${post.bet.wager}</p>
          <p>Payout ${parseInt(post.bet.payout).toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default Bet;
